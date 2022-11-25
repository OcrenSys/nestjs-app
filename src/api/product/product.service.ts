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
import { QueryRunner, Repository, DataSource } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private readonly logger: Logger = new Logger('ProductService');
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { ...toCreate } = createProductDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const product = await this.productRepository.create(toCreate);

      this.productRepository.save(product);

      await this.queryRunner.commitTransaction();

      return {
        data: product,
        statusCode: HttpStatus.CREATED,
        message: ACTION_CREATE.success(MODEL.Product),
      };
    } catch (error) {
      this.queryRunner.rollbackTransaction();
      throw new BadRequestException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_CREATE.error(MODEL.Product),
        },
        ACTION_CREATE.error(MODEL.Product),
      );
    } finally {
      this.queryRunner.release();
    }
  }

  async findAll() {
    const filters = {};
    const relations = [];

    try {
      const products = await this.productRepository.find({
        where: filters,
        relations,
      });

      return {
        data: products,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.Product),
      };
    } catch (error) {
      this.logger.error(error?.message, error);
      throw new NotFoundException(
        {
          data: error,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_FIND.error(MODEL.Product),
        },
        ACTION_FIND.error(MODEL.Product),
      );
    }
  }

  async findOne(id: number) {
    const filters = { id };
    const relations = [];

    try {
      const product: Product = await this.productRepository.findOne({
        relations,
        where: filters,
      });

      if (!product)
        return new NotFoundException(
          {
            data: null,
            status: HttpStatus.NOT_FOUND,
            message: ACTION_FIND.error(MODEL.Product, ONLY_ONE),
          },
          ACTION_FIND.error(MODEL.Product, ONLY_ONE),
        );

      return {
        data: product,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.Product, ONLY_ONE),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_FIND.error(MODEL.Product, ONLY_ONE),
        },
        ACTION_FIND.error(MODEL.Product),
      );
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { ...toUpdate } = updateProductDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const product: Product = await this.productRepository.preload({
      id,
      ...toUpdate,
    });

    if (!product)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.Product),
        },
        ACTION_UPDATE.error(MODEL.Product),
      );

    try {
      this.productRepository.save(product);

      await this.queryRunner.commitTransaction();

      return {
        data: product,
        statusCode: HttpStatus.OK,
        message: ACTION_UPDATE.success(MODEL.Product),
      };
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_UPDATE.error(MODEL.Product),
        },
        ACTION_UPDATE.error(MODEL.Product),
      );
    } finally {
      await this.queryRunner.release();
    }
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.Product),
        },
        ACTION_REMOVE.error(MODEL.Product),
      );
    try {
      const result = await this.productRepository.delete(id);

      return {
        data: result,
        statusCode: HttpStatus.OK,
        message: ACTION_REMOVE.success(MODEL.Product),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_REMOVE.error(MODEL.Product),
        },
        ACTION_REMOVE.error(MODEL.Product),
      );
    }
  }
}
