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
import { CreateSaleOrderDetailDto } from './dto/create-sale-order-detail.dto';
import { UpdateSaleOrderDetailDto } from './dto/update-sale-order-detail.dto';
import { SaleOrderDetail } from '../../database/models/sale-order-detail.entity';

@Injectable()
export class SaleOrderDetailService {
  private readonly logger: Logger = new Logger('SaleOrderDetailService');
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(SaleOrderDetail)
    private readonly saleOrderDetailRepository: Repository<SaleOrderDetail>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createSaleOrderDetailDto: CreateSaleOrderDetailDto) {
    const { ...toCreate } = createSaleOrderDetailDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const saleOrderDetail = await this.saleOrderDetailRepository.create(
        toCreate,
      );

      this.saleOrderDetailRepository.save(saleOrderDetail);

      await this.queryRunner.commitTransaction();

      return {
        data: saleOrderDetail,
        statusCode: HttpStatus.CREATED,
        message: ACTION_CREATE.success(MODEL.SaleOrderDetail),
      };
    } catch (error) {
      this.queryRunner.rollbackTransaction();
      throw new BadRequestException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_CREATE.error(MODEL.SaleOrderDetail),
        },
        ACTION_CREATE.error(MODEL.SaleOrderDetail),
      );
    } finally {
      this.queryRunner.release();
    }
  }

  async findAll() {
    const filters = {};
    const relations = ['product', 'saleOrder'];

    try {
      const saleOrderDetails = await this.saleOrderDetailRepository.find({
        where: filters,
        relations,
      });

      return {
        data: saleOrderDetails,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.SaleOrderDetail),
      };
    } catch (error) {
      this.logger.error(error?.message, error);
      throw new NotFoundException(
        {
          data: error,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_FIND.error(MODEL.SaleOrderDetail),
        },
        ACTION_FIND.error(MODEL.SaleOrderDetail),
      );
    }
  }

  async findOne(id: number) {
    const filters = { id };
    const relations = ['product', 'saleOrder'];

    try {
      const saleOrderDetail: SaleOrderDetail =
        await this.saleOrderDetailRepository.findOne({
          relations,
          where: filters,
        });

      if (!saleOrderDetail)
        return new NotFoundException(
          {
            data: null,
            status: HttpStatus.NOT_FOUND,
            message: ACTION_FIND.error(MODEL.SaleOrderDetail, ONLY_ONE),
          },
          ACTION_FIND.error(MODEL.SaleOrderDetail, ONLY_ONE),
        );

      return {
        data: saleOrderDetail,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.SaleOrderDetail, ONLY_ONE),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_FIND.error(MODEL.SaleOrderDetail, ONLY_ONE),
        },
        ACTION_FIND.error(MODEL.SaleOrderDetail),
      );
    }
  }

  async update(id: number, updateSaleOrderDetailDto: UpdateSaleOrderDetailDto) {
    const { ...toUpdate } = updateSaleOrderDetailDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const saleOrderDetail: SaleOrderDetail =
      await this.saleOrderDetailRepository.preload({
        id,
        ...toUpdate,
      });

    if (!saleOrderDetail)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.SaleOrderDetail),
        },
        ACTION_UPDATE.error(MODEL.SaleOrderDetail),
      );

    try {
      this.saleOrderDetailRepository.save(saleOrderDetail);

      await this.queryRunner.commitTransaction();

      return {
        data: saleOrderDetail,
        statusCode: HttpStatus.OK,
        message: ACTION_UPDATE.success(MODEL.SaleOrderDetail),
      };
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_UPDATE.error(MODEL.SaleOrderDetail),
        },
        ACTION_UPDATE.error(MODEL.SaleOrderDetail),
      );
    } finally {
      await this.queryRunner.release();
    }
  }

  async remove(id: number) {
    const saleOrderDetail = await this.saleOrderDetailRepository.findOne({
      where: { id },
    });

    if (!saleOrderDetail)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.SaleOrderDetail),
        },
        ACTION_REMOVE.error(MODEL.SaleOrderDetail),
      );
    try {
      const result = await this.saleOrderDetailRepository.delete(id);

      return {
        data: result,
        statusCode: HttpStatus.OK,
        message: ACTION_REMOVE.success(MODEL.SaleOrderDetail),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_REMOVE.error(MODEL.SaleOrderDetail),
        },
        ACTION_REMOVE.error(MODEL.SaleOrderDetail),
      );
    }
  }
}
