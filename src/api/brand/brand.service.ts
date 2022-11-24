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
} from 'src/common/constants/messages.constants';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  private readonly logger: Logger = new Logger('BrandService');
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const { ...toCreate } = createBrandDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const brand = await this.brandRepository.create(toCreate);

      this.brandRepository.save(brand);

      await this.queryRunner.commitTransaction();

      return {
        data: brand,
        statusCode: HttpStatus.CREATED,
        message: ACTION_CREATE.success(MODEL.Brand),
      };
    } catch (error) {
      this.queryRunner.rollbackTransaction();
      throw new BadRequestException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_CREATE.error(MODEL.Brand),
        },
        ACTION_CREATE.error(MODEL.Brand),
      );
    } finally {
      this.queryRunner.release();
    }
  }

  async findAll() {
    const filters = {};
    const relations = [];

    try {
      const brands = await this.brandRepository.find({
        where: filters,
        relations,
      });

      return {
        data: brands,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.Brand),
      };
    } catch (error) {
      this.logger.error(error?.message, error);
      throw new NotFoundException(
        {
          data: error,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_FIND.error(MODEL.Brand),
        },
        ACTION_FIND.error(MODEL.Brand),
      );
    }
  }

  async findOne(id: number) {
    const filters = { id };
    const relations = [];

    try {
      const brand: Brand = await this.brandRepository.findOne({
        relations,
        where: filters,
      });

      if (!brand)
        return new NotFoundException(
          {
            data: null,
            status: HttpStatus.NOT_FOUND,
            message: ACTION_FIND.error(MODEL.Brand, ONLY_ONE),
          },
          ACTION_FIND.error(MODEL.Brand, ONLY_ONE),
        );

      return {
        data: brand,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.Brand, ONLY_ONE),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_FIND.error(MODEL.Brand, ONLY_ONE),
        },
        ACTION_FIND.error(MODEL.Brand),
      );
    }
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const { ...toUpdate } = updateBrandDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const brand: Brand = await this.brandRepository.preload({
      id,
      ...toUpdate,
    });

    if (!brand)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.Brand),
        },
        ACTION_UPDATE.error(MODEL.Brand),
      );

    try {
      this.brandRepository.save(brand);

      await this.queryRunner.commitTransaction();

      return {
        data: brand,
        statusCode: HttpStatus.OK,
        message: ACTION_UPDATE.success(MODEL.Brand),
      };
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_UPDATE.error(MODEL.Brand),
        },
        ACTION_UPDATE.error(MODEL.Brand),
      );
    } finally {
      await this.queryRunner.release();
    }
  }

  async remove(id: number) {
    const brand = await this.brandRepository.findOne({
      where: { id },
    });

    if (!brand)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.Brand),
        },
        ACTION_REMOVE.error(MODEL.Brand),
      );
    try {
      const result = await this.brandRepository.delete(id);

      return {
        data: result,
        statusCode: HttpStatus.OK,
        message: ACTION_REMOVE.success(MODEL.Brand),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_REMOVE.error(MODEL.Brand),
        },
        ACTION_REMOVE.error(MODEL.Brand),
      );
    }
  }
}
