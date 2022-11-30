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
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase-order-detail.dto';
import { UpdatePurchaseOrderDetailDto } from './dto/update-purchase-order-detail.dto';
import { PurchaseOrderDetail } from '../../database/models/purchase-order-detail.entity';

@Injectable()
export class PurchaseOrderDetailService {
  private readonly logger: Logger = new Logger('PurchaseOrderDetailService');
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(PurchaseOrderDetail)
    private readonly purchaseOrderDetailRepository: Repository<PurchaseOrderDetail>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createPurchaseOrderDetailDto: CreatePurchaseOrderDetailDto) {
    const {
      product = null,
      purchaseOrder = null,
      ...toCreate
    } = createPurchaseOrderDetailDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const purchaseOrderDetail =
        await this.purchaseOrderDetailRepository.create({
          product,
          purchaseOrder,
          ...toCreate,
        });

      this.purchaseOrderDetailRepository.save(purchaseOrderDetail);

      await this.queryRunner.commitTransaction();

      return {
        data: purchaseOrderDetail,
        statusCode: HttpStatus.CREATED,
        message: ACTION_CREATE.success(MODEL.PurchaseOrderDetail),
      };
    } catch (error) {
      this.queryRunner.rollbackTransaction();
      throw new BadRequestException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_CREATE.error(MODEL.PurchaseOrderDetail),
        },
        ACTION_CREATE.error(MODEL.PurchaseOrderDetail),
      );
    } finally {
      this.queryRunner.release();
    }
  }

  async findAll() {
    const filters = {};
    const relations = ['product', 'purchaseOrder'];

    try {
      const purchaseOrderDetails =
        await this.purchaseOrderDetailRepository.find({
          where: filters,
          relations,
        });

      return {
        data: purchaseOrderDetails,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.PurchaseOrderDetail),
      };
    } catch (error) {
      this.logger.error(error?.message, error);
      throw new NotFoundException(
        {
          data: error,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_FIND.error(MODEL.PurchaseOrderDetail),
        },
        ACTION_FIND.error(MODEL.PurchaseOrderDetail),
      );
    }
  }

  async findOne(id: number) {
    const filters = { id };
    const relations = ['product', 'purchaseOrder'];

    try {
      const purchaseOrderDetail: PurchaseOrderDetail =
        await this.purchaseOrderDetailRepository.findOne({
          relations,
          where: filters,
        });

      if (!purchaseOrderDetail)
        return new NotFoundException(
          {
            data: null,
            status: HttpStatus.NOT_FOUND,
            message: ACTION_FIND.error(MODEL.PurchaseOrderDetail, ONLY_ONE),
          },
          ACTION_FIND.error(MODEL.PurchaseOrderDetail, ONLY_ONE),
        );

      return {
        data: purchaseOrderDetail,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.PurchaseOrderDetail, ONLY_ONE),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_FIND.error(MODEL.PurchaseOrderDetail, ONLY_ONE),
        },
        ACTION_FIND.error(MODEL.PurchaseOrderDetail),
      );
    }
  }

  async update(
    id: number,
    updatePurchaseOrderDetailDto: UpdatePurchaseOrderDetailDto,
  ) {
    const {
      product = null,
      purchaseOrder = null,
      ...toUpdate
    } = updatePurchaseOrderDetailDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const purchaseOrderDetail: PurchaseOrderDetail =
      await this.purchaseOrderDetailRepository.preload({
        id,
        product,
        purchaseOrder,
        ...toUpdate,
      });

    if (!purchaseOrderDetail)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.PurchaseOrderDetail),
        },
        ACTION_UPDATE.error(MODEL.PurchaseOrderDetail),
      );

    try {
      this.purchaseOrderDetailRepository.save(purchaseOrderDetail);

      await this.queryRunner.commitTransaction();

      return {
        data: purchaseOrderDetail,
        statusCode: HttpStatus.OK,
        message: ACTION_UPDATE.success(MODEL.PurchaseOrderDetail),
      };
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_UPDATE.error(MODEL.PurchaseOrderDetail),
        },
        ACTION_UPDATE.error(MODEL.PurchaseOrderDetail),
      );
    } finally {
      await this.queryRunner.release();
    }
  }

  async remove(id: number) {
    const purchaseOrderDetail =
      await this.purchaseOrderDetailRepository.findOne({
        where: { id },
      });

    if (!purchaseOrderDetail)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.PurchaseOrderDetail),
        },
        ACTION_REMOVE.error(MODEL.PurchaseOrderDetail),
      );
    try {
      const result = await this.purchaseOrderDetailRepository.delete(id);

      return {
        data: result,
        statusCode: HttpStatus.OK,
        message: ACTION_REMOVE.success(MODEL.PurchaseOrderDetail),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_REMOVE.error(MODEL.PurchaseOrderDetail),
        },
        ACTION_REMOVE.error(MODEL.PurchaseOrderDetail),
      );
    }
  }
}
