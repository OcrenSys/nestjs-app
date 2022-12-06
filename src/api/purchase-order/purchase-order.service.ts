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
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { PurchaseOrder } from '../../database/models/purchase-order.entity';
import { PurchaseOrderDetail } from '../../database/models/purchase-order-detail.entity';
import { CreatePurchaseOrderDetailDto } from '../purchase-order-detail/dto/create-purchase-order-detail.dto';

@Injectable()
export class PurchaseOrderService {
  private readonly logger: Logger = new Logger('PurchaseOrderService');
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(PurchaseOrderDetail)
    private readonly purchaseOrderDetailRepository: Repository<PurchaseOrderDetail>,
    @InjectRepository(PurchaseOrder)
    private readonly purchaseOrderRepository: Repository<PurchaseOrder>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const { purchaseOrderDetails = [], ...toCreate } = createPurchaseOrderDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const _purchaseOrderCreated: PurchaseOrder =
        this.purchaseOrderRepository.create({
          purchaseOrderDetails: purchaseOrderDetails?.length
            ? purchaseOrderDetails?.map(
                ({ purchaseOrder, ...rest }: CreatePurchaseOrderDetailDto) =>
                  this.purchaseOrderDetailRepository.create(rest),
              )
            : [],
          ...toCreate,
        });

      if (!_purchaseOrderCreated) throw new BadRequestException();

      const result = await this.purchaseOrderRepository.save(
        _purchaseOrderCreated,
      );

      await this.queryRunner.commitTransaction();

      return {
        data: result,
        statusCode: HttpStatus.CREATED,
        message: ACTION_CREATE.success(MODEL.PurchaseOrder),
      };
    } catch (error) {
      this.queryRunner.rollbackTransaction();
      throw new BadRequestException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_CREATE.error(MODEL.PurchaseOrder),
        },
        ACTION_CREATE.error(MODEL.PurchaseOrder),
      );
    } finally {
      this.queryRunner.release();
    }
  }

  async findAll() {
    const filters = {};
    const relations = ['purchaseOrderDetails'];

    try {
      const purchaseOrders = await this.purchaseOrderRepository.find({
        where: filters,
        relations,
      });

      return {
        data: purchaseOrders,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.PurchaseOrder),
      };
    } catch (error) {
      this.logger.error(error?.message, error);
      throw new NotFoundException(
        {
          data: error,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_FIND.error(MODEL.PurchaseOrder),
        },
        ACTION_FIND.error(MODEL.PurchaseOrder),
      );
    }
  }

  async findOne(id: number) {
    const filters = { id };
    const relations = ['purchaseOrderDetails'];

    try {
      const purchaseOrder: PurchaseOrder =
        await this.purchaseOrderRepository.findOne({
          relations,
          where: filters,
        });

      if (!purchaseOrder)
        return new NotFoundException(
          {
            data: null,
            status: HttpStatus.NOT_FOUND,
            message: ACTION_FIND.error(MODEL.PurchaseOrder, ONLY_ONE),
          },
          ACTION_FIND.error(MODEL.PurchaseOrder, ONLY_ONE),
        );

      return {
        data: purchaseOrder,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.PurchaseOrder, ONLY_ONE),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_FIND.error(MODEL.PurchaseOrder, ONLY_ONE),
        },
        ACTION_FIND.error(MODEL.PurchaseOrder),
      );
    }
  }

  async update(id: number, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    const { purchaseOrderDetails = [], ...toUpdate } = updatePurchaseOrderDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const purchaseOrder: PurchaseOrder =
      await this.purchaseOrderRepository.preload({
        id,
        purchaseOrderDetails: purchaseOrderDetails,
        ...toUpdate,
      });

    if (!purchaseOrder)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.PurchaseOrder),
        },
        ACTION_UPDATE.error(MODEL.PurchaseOrder),
      );

    try {
      this.purchaseOrderRepository.save(purchaseOrder);

      await this.queryRunner.commitTransaction();

      return {
        data: purchaseOrder,
        statusCode: HttpStatus.OK,
        message: ACTION_UPDATE.success(MODEL.PurchaseOrder),
      };
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_UPDATE.error(MODEL.PurchaseOrder),
        },
        ACTION_UPDATE.error(MODEL.PurchaseOrder),
      );
    } finally {
      await this.queryRunner.release();
    }
  }

  async remove(id: number) {
    const purchaseOrder = await this.purchaseOrderRepository.findOne({
      where: { id },
    });

    if (!purchaseOrder)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.PurchaseOrder),
        },
        ACTION_REMOVE.error(MODEL.PurchaseOrder),
      );
    try {
      const result = await this.purchaseOrderRepository.delete(id);

      return {
        data: result,
        statusCode: HttpStatus.OK,
        message: ACTION_REMOVE.success(MODEL.PurchaseOrder),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_REMOVE.error(MODEL.PurchaseOrder),
        },
        ACTION_REMOVE.error(MODEL.PurchaseOrder),
      );
    }
  }
}
