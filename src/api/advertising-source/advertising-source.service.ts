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
  ACTION_FIND,
  ACTION_REMOVE,
  ACTION_UPDATE,
  ONLY_ONE,
  MODEL,
} from '../../common/constants/messages.constants';
import { Repository, DataSource } from 'typeorm';
import { CreateAdvertisingSourceDto } from './dto/create-advertising-source.dto';
import { UpdateAdvertisingSourceDto } from './dto/update-advertising-source.dto';
import { AdvertisingSource } from '../../database/models/advertising-source.entity';

@Injectable()
export class AdvertisingSourceService {
  private readonly logger = new Logger('AdvertisingSourceService');
  private queryRunner;

  constructor(
    @InjectRepository(AdvertisingSource)
    private readonly advertisingSourceRepository: Repository<AdvertisingSource>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createAdvertisingSourceDto: CreateAdvertisingSourceDto) {
    const { ...toCreate } = createAdvertisingSourceDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const advertisingSource = await this.advertisingSourceRepository.create(
        toCreate,
      );

      this.advertisingSourceRepository.save(advertisingSource);

      await this.queryRunner.commitTransaction();

      return {
        data: advertisingSource,
        statusCode: HttpStatus.CREATED,
        message: ACTION_CREATE.success(MODEL.AdvertisingSource),
      };
    } catch (error) {
      this.queryRunner.rollbackTransaction();
      throw new BadRequestException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_CREATE.error(MODEL.AdvertisingSource),
        },
        ACTION_CREATE.error(MODEL.AdvertisingSource),
      );
    } finally {
      this.queryRunner.release();
    }
  }

  async findAll() {
    const filters = {};
    const relations = [];

    try {
      const advertisingSources = await this.advertisingSourceRepository.find({
        where: filters,
        relations,
      });

      return {
        data: advertisingSources,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.AdvertisingSource),
      };
    } catch (error) {
      this.logger.error(error?.message, error);
      throw new NotFoundException(
        {
          data: error,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_FIND.error(MODEL.AdvertisingSource),
        },
        ACTION_FIND.error(MODEL.AdvertisingSource),
      );
    }
  }

  async findOne(id: number) {
    const filters = { id };
    const relations = [];

    try {
      const advertisingSource: AdvertisingSource =
        await this.advertisingSourceRepository.findOne({
          relations,
          where: filters,
        });

      if (!advertisingSource)
        return new NotFoundException(
          {
            data: null,
            status: HttpStatus.NOT_FOUND,
            message: ACTION_FIND.error(MODEL.AdvertisingSource, ONLY_ONE),
          },
          ACTION_FIND.error(MODEL.AdvertisingSource, ONLY_ONE),
        );

      return {
        data: advertisingSource,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.AdvertisingSource, ONLY_ONE),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_FIND.error(MODEL.AdvertisingSource, ONLY_ONE),
        },
        ACTION_FIND.error(MODEL.AdvertisingSource),
      );
    }
  }

  async update(
    id: number,
    updateAdvertisingSourceDto: UpdateAdvertisingSourceDto,
  ) {
    const { ...toUpdate } = updateAdvertisingSourceDto;
    this.queryRunner = this.dataSource.createQueryRunner();

    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const advertisingSource: AdvertisingSource =
      await this.advertisingSourceRepository.preload({
        id,
        ...toUpdate,
      });

    if (!advertisingSource)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.AdvertisingSource),
        },
        ACTION_UPDATE.error(MODEL.AdvertisingSource),
      );

    try {
      this.advertisingSourceRepository.save(advertisingSource);

      await this.queryRunner.commitTransaction();

      return {
        data: advertisingSource,
        statusCode: HttpStatus.OK,
        message: ACTION_UPDATE.success(MODEL.AdvertisingSource),
      };
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_UPDATE.error(MODEL.AdvertisingSource),
        },
        ACTION_UPDATE.error(MODEL.AdvertisingSource),
      );
    } finally {
      await this.queryRunner.release();
    }
  }

  async remove(id: number) {
    const advertisingSource = await this.advertisingSourceRepository.findOne({
      where: { id },
    });

    if (!advertisingSource)
      throw new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.AdvertisingSource),
        },
        ACTION_REMOVE.error(MODEL.AdvertisingSource),
      );
    try {
      const result = await this.advertisingSourceRepository.delete(id);

      return {
        data: result,
        statusCode: HttpStatus.OK,
        message: ACTION_REMOVE.success(MODEL.AdvertisingSource),
      };
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_REMOVE.error(MODEL.AdvertisingSource),
        },
        ACTION_REMOVE.error(MODEL.AdvertisingSource),
      );
    } finally {
      await this.queryRunner.release();
    }
  }
}
