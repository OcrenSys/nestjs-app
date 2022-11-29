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
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';
import { PaymentType } from './entities/payment-type.entity';

@Injectable()
export class PaymentTypeService {
  private readonly logger: Logger = new Logger('PaymentTypeService');
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(PaymentType)
    private readonly paymentTypeRepository: Repository<PaymentType>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createPaymentTypeDto: CreatePaymentTypeDto) {
    const { ...toCreate } = createPaymentTypeDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const paymentType = await this.paymentTypeRepository.create(toCreate);

      this.paymentTypeRepository.save(paymentType);

      await this.queryRunner.commitTransaction();

      return {
        data: paymentType,
        statusCode: HttpStatus.CREATED,
        message: ACTION_CREATE.success(MODEL.PaymentType),
      };
    } catch (error) {
      this.queryRunner.rollbackTransaction();
      throw new BadRequestException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_CREATE.error(MODEL.PaymentType),
        },
        ACTION_CREATE.error(MODEL.PaymentType),
      );
    } finally {
      this.queryRunner.release();
    }
  }

  async findAll() {
    const filters = {};
    const relations = [];

    try {
      const paymentTypes = await this.paymentTypeRepository.find({
        where: filters,
        relations,
      });

      return {
        data: paymentTypes,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.PaymentType),
      };
    } catch (error) {
      this.logger.error(error?.message, error);
      throw new NotFoundException(
        {
          data: error,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_FIND.error(MODEL.PaymentType),
        },
        ACTION_FIND.error(MODEL.PaymentType),
      );
    }
  }

  async findOne(id: number) {
    const filters = { id };
    const relations = [];

    try {
      const paymentType: PaymentType = await this.paymentTypeRepository.findOne(
        {
          relations,
          where: filters,
        },
      );

      if (!paymentType)
        return new NotFoundException(
          {
            data: null,
            status: HttpStatus.NOT_FOUND,
            message: ACTION_FIND.error(MODEL.PaymentType, ONLY_ONE),
          },
          ACTION_FIND.error(MODEL.PaymentType, ONLY_ONE),
        );

      return {
        data: paymentType,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.PaymentType, ONLY_ONE),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_FIND.error(MODEL.PaymentType, ONLY_ONE),
        },
        ACTION_FIND.error(MODEL.PaymentType),
      );
    }
  }

  async update(id: number, updatePaymentTypeDto: UpdatePaymentTypeDto) {
    const { ...toUpdate } = updatePaymentTypeDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const paymentType: PaymentType = await this.paymentTypeRepository.preload({
      id,
      ...toUpdate,
    });

    if (!paymentType)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.PaymentType),
        },
        ACTION_UPDATE.error(MODEL.PaymentType),
      );

    try {
      this.paymentTypeRepository.save(paymentType);

      await this.queryRunner.commitTransaction();

      return {
        data: paymentType,
        statusCode: HttpStatus.OK,
        message: ACTION_UPDATE.success(MODEL.PaymentType),
      };
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_UPDATE.error(MODEL.PaymentType),
        },
        ACTION_UPDATE.error(MODEL.PaymentType),
      );
    } finally {
      await this.queryRunner.release();
    }
  }

  async remove(id: number) {
    const paymentType = await this.paymentTypeRepository.findOne({
      where: { id },
    });

    if (!paymentType)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.PaymentType),
        },
        ACTION_REMOVE.error(MODEL.PaymentType),
      );
    try {
      const result = await this.paymentTypeRepository.delete(id);

      return {
        data: result,
        statusCode: HttpStatus.OK,
        message: ACTION_REMOVE.success(MODEL.PaymentType),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_REMOVE.error(MODEL.PaymentType),
        },
        ACTION_REMOVE.error(MODEL.PaymentType),
      );
    }
  }
}
