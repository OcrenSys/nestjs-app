import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ACTION_CREATE,
  MODEL,
  ACTION_FIND,
  ONLY_ONE,
  ACTION_UPDATE,
  ACTION_REMOVE,
} from '../../common/constants/messages.constants';
import { QueryRunner, Repository, DataSource } from 'typeorm';
import { CreateSaleOrderDto } from './dto/create-sale-order.dto';
import { UpdateSaleOrderDto } from './dto/update-sale-order.dto';
import { SaleOrder } from '../../database/models/sale-order.entity';

@Injectable()
export class SaleOrderService {
  private readonly logger: Logger = new Logger('SaleOrderService');
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(SaleOrder)
    private readonly saleOrderRepository: Repository<SaleOrder>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createSaleOrderDto: CreateSaleOrderDto) {
    const { ...toCreate } = createSaleOrderDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const saleOrder = await this.saleOrderRepository.create(toCreate);

      this.saleOrderRepository.save(saleOrder);

      await this.queryRunner.commitTransaction();

      return {
        data: saleOrder,
        statusCode: HttpStatus.CREATED,
        message: ACTION_CREATE.success(MODEL.SaleOrder),
      };
    } catch (error) {
      this.queryRunner.rollbackTransaction();
      throw new BadRequestException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_CREATE.error(MODEL.SaleOrder),
        },
        ACTION_CREATE.error(MODEL.SaleOrder),
      );
    } finally {
      this.queryRunner.release();
    }
  }

  async findAll() {
    const filters = {};
    const relations = [];

    try {
      const saleOrders = await this.saleOrderRepository.find({
        where: filters,
        relations,
      });

      return {
        data: saleOrders,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.SaleOrder),
      };
    } catch (error) {
      this.logger.error(error?.message, error);
      throw new NotFoundException(
        {
          data: error,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_FIND.error(MODEL.SaleOrder),
        },
        ACTION_FIND.error(MODEL.SaleOrder),
      );
    }
  }

  async findOne(id: number) {
    const filters = { id };
    const relations = [];

    try {
      const saleOrder: SaleOrder = await this.saleOrderRepository.findOne({
        relations,
        where: filters,
      });

      if (!saleOrder)
        return new NotFoundException(
          {
            data: null,
            status: HttpStatus.NOT_FOUND,
            message: ACTION_FIND.error(MODEL.SaleOrder, ONLY_ONE),
          },
          ACTION_FIND.error(MODEL.SaleOrder, ONLY_ONE),
        );

      return {
        data: saleOrder,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.SaleOrder, ONLY_ONE),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_FIND.error(MODEL.SaleOrder, ONLY_ONE),
        },
        ACTION_FIND.error(MODEL.SaleOrder),
      );
    }
  }

  async update(id: number, updateSaleOrderDto: UpdateSaleOrderDto) {
    const { ...toUpdate } = updateSaleOrderDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const saleOrder: SaleOrder = await this.saleOrderRepository.preload({
      id,
      ...toUpdate,
    });

    if (!saleOrder)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.SaleOrder),
        },
        ACTION_UPDATE.error(MODEL.SaleOrder),
      );

    try {
      this.saleOrderRepository.save(saleOrder);

      await this.queryRunner.commitTransaction();

      return {
        data: saleOrder,
        statusCode: HttpStatus.OK,
        message: ACTION_UPDATE.success(MODEL.SaleOrder),
      };
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_UPDATE.error(MODEL.SaleOrder),
        },
        ACTION_UPDATE.error(MODEL.SaleOrder),
      );
    } finally {
      await this.queryRunner.release();
    }
  }

  async remove(id: number) {
    const saleOrder = await this.saleOrderRepository.findOne({
      where: { id },
    });

    if (!saleOrder)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.SaleOrder),
        },
        ACTION_REMOVE.error(MODEL.SaleOrder),
      );
    try {
      const result = await this.saleOrderRepository.delete(id);

      return {
        data: result,
        statusCode: HttpStatus.OK,
        message: ACTION_REMOVE.success(MODEL.SaleOrder),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_REMOVE.error(MODEL.SaleOrder),
        },
        ACTION_REMOVE.error(MODEL.SaleOrder),
      );
    }
  }
}
