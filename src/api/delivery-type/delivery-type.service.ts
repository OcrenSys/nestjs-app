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
import { CreateDeliveryTypeDto } from './dto/create-delivery-type.dto';
import { UpdateDeliveryTypeDto } from './dto/update-delivery-type.dto';
import { DeliveryType } from './entities/delivery-type.entity';

@Injectable()
export class DeliveryTypeService {
  private readonly logger: Logger = new Logger('DeliveryTypeService');
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(DeliveryType)
    private readonly beliveryTypeRepository: Repository<DeliveryType>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createDeliveryTypeDto: CreateDeliveryTypeDto) {
    const { ...toCreate } = createDeliveryTypeDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const beliveryType = await this.beliveryTypeRepository.create(toCreate);

      this.beliveryTypeRepository.save(beliveryType);

      await this.queryRunner.commitTransaction();

      return {
        data: beliveryType,
        statusCode: HttpStatus.CREATED,
        message: ACTION_CREATE.success(MODEL.DeliveryType),
      };
    } catch (error) {
      this.queryRunner.rollbackTransaction();
      throw new BadRequestException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_CREATE.error(MODEL.DeliveryType),
        },
        ACTION_CREATE.error(MODEL.DeliveryType),
      );
    } finally {
      this.queryRunner.release();
    }
  }

  async findAll() {
    const filters = {};
    const relations = [];

    try {
      const beliveryTypes = await this.beliveryTypeRepository.find({
        where: filters,
        relations,
      });

      return {
        data: beliveryTypes,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.DeliveryType),
      };
    } catch (error) {
      this.logger.error(error?.message, error);
      throw new NotFoundException(
        {
          data: error,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_FIND.error(MODEL.DeliveryType),
        },
        ACTION_FIND.error(MODEL.DeliveryType),
      );
    }
  }

  async findOne(id: number) {
    const filters = { id };
    const relations = [];

    try {
      const beliveryType: DeliveryType =
        await this.beliveryTypeRepository.findOne({
          relations,
          where: filters,
        });

      if (!beliveryType)
        return new NotFoundException(
          {
            data: null,
            status: HttpStatus.NOT_FOUND,
            message: ACTION_FIND.error(MODEL.DeliveryType, ONLY_ONE),
          },
          ACTION_FIND.error(MODEL.DeliveryType, ONLY_ONE),
        );

      return {
        data: beliveryType,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.DeliveryType, ONLY_ONE),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_FIND.error(MODEL.DeliveryType, ONLY_ONE),
        },
        ACTION_FIND.error(MODEL.DeliveryType),
      );
    }
  }

  async update(id: number, updateDeliveryTypeDto: UpdateDeliveryTypeDto) {
    const { ...toUpdate } = updateDeliveryTypeDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const beliveryType: DeliveryType =
      await this.beliveryTypeRepository.preload({
        id,
        ...toUpdate,
      });

    if (!beliveryType)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.DeliveryType),
        },
        ACTION_UPDATE.error(MODEL.DeliveryType),
      );

    try {
      this.beliveryTypeRepository.save(beliveryType);

      await this.queryRunner.commitTransaction();

      return {
        data: beliveryType,
        statusCode: HttpStatus.OK,
        message: ACTION_UPDATE.success(MODEL.DeliveryType),
      };
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_UPDATE.error(MODEL.DeliveryType),
        },
        ACTION_UPDATE.error(MODEL.DeliveryType),
      );
    } finally {
      await this.queryRunner.release();
    }
  }

  async remove(id: number) {
    const beliveryType = await this.beliveryTypeRepository.findOne({
      where: { id },
    });

    if (!beliveryType)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.DeliveryType),
        },
        ACTION_REMOVE.error(MODEL.DeliveryType),
      );
    try {
      const result = await this.beliveryTypeRepository.delete(id);

      return {
        data: result,
        statusCode: HttpStatus.OK,
        message: ACTION_REMOVE.success(MODEL.DeliveryType),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_REMOVE.error(MODEL.DeliveryType),
        },
        ACTION_REMOVE.error(MODEL.DeliveryType),
      );
    }
  }
}
