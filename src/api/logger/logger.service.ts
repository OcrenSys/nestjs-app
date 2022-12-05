import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
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
import { Logger } from '../../database/models/logger.entity';
import { QueryRunner, Repository, DataSource } from 'typeorm';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { UpdateLoggerDto } from './dto/update-logger.dto';

@Injectable()
export class LoggerService {
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(Logger)
    private readonly loggerRepository: Repository<Logger>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createLoggerDto: CreateLoggerDto) {
    const { ...toCreate } = createLoggerDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const logger = await this.loggerRepository.create(toCreate);

      this.loggerRepository.save(logger);

      await this.queryRunner.commitTransaction();

      return {
        data: logger,
        statusCode: HttpStatus.CREATED,
        message: ACTION_CREATE.success(MODEL.Logger),
      };
    } catch (error) {
      this.queryRunner.rollbackTransaction();
      throw new BadRequestException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_CREATE.error(MODEL.Logger),
        },
        ACTION_CREATE.error(MODEL.Logger),
      );
    } finally {
      this.queryRunner.release();
    }
  }

  async findAll() {
    const filters = {};
    const relations = ['user'];

    try {
      const loggers = await this.loggerRepository.find({
        where: filters,
        relations,
      });

      return {
        data: loggers,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.Logger),
      };
    } catch (error) {
      throw new NotFoundException(
        {
          data: error,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_FIND.error(MODEL.Logger),
        },
        ACTION_FIND.error(MODEL.Logger),
      );
    }
  }

  async findOne(id: number) {
    const filters = { id };
    const relations = ['user'];

    try {
      const logger: Logger = await this.loggerRepository.findOne({
        relations,
        where: filters,
      });

      if (!logger)
        return new NotFoundException(
          {
            data: null,
            status: HttpStatus.NOT_FOUND,
            message: ACTION_FIND.error(MODEL.Logger, ONLY_ONE),
          },
          ACTION_FIND.error(MODEL.Logger, ONLY_ONE),
        );

      return {
        data: logger,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.Logger, ONLY_ONE),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_FIND.error(MODEL.Logger, ONLY_ONE),
        },
        ACTION_FIND.error(MODEL.Logger),
      );
    }
  }

  async update(id: number, updateLoggerDto: UpdateLoggerDto) {
    const { ...toUpdate } = updateLoggerDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const logger: Logger = await this.loggerRepository.preload({
      id,
      ...toUpdate,
    });

    if (!logger)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.Logger),
        },
        ACTION_UPDATE.error(MODEL.Logger),
      );

    try {
      this.loggerRepository.save(logger);

      await this.queryRunner.commitTransaction();

      return {
        data: logger,
        statusCode: HttpStatus.OK,
        message: ACTION_UPDATE.success(MODEL.Logger),
      };
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_UPDATE.error(MODEL.Logger),
        },
        ACTION_UPDATE.error(MODEL.Logger),
      );
    } finally {
      await this.queryRunner.release();
    }
  }

  async remove(id: number) {
    const logger = await this.loggerRepository.findOne({
      where: { id },
    });

    if (!logger)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.Logger),
        },
        ACTION_REMOVE.error(MODEL.Logger),
      );
    try {
      const result = await this.loggerRepository.delete(id);

      return {
        data: result,
        statusCode: HttpStatus.OK,
        message: ACTION_REMOVE.success(MODEL.Logger),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_REMOVE.error(MODEL.Logger),
        },
        ACTION_REMOVE.error(MODEL.Logger),
      );
    }
  }
}
