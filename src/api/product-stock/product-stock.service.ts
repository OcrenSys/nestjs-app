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
import { ProductStock } from 'src/database/models/product-stock.entity';
import { QueryRunner, Repository, DataSource } from 'typeorm';
import { CreateProductStockDto } from './dto/create-product-stock.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';

@Injectable()
export class ProductStockService {
  private readonly logger: Logger = new Logger('ProductStockService');
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(ProductStock)
    private readonly productStockRepository: Repository<ProductStock>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createProductStockDto: CreateProductStockDto) {
    const { product = null, ...toCreate } = createProductStockDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const productStock = await this.productStockRepository.create({
        product,
        ...toCreate,
      });

      this.productStockRepository.save(productStock);

      await this.queryRunner.commitTransaction();

      return {
        data: productStock,
        statusCode: HttpStatus.CREATED,
        message: ACTION_CREATE.success(MODEL.ProductStock),
      };
    } catch (error) {
      this.queryRunner.rollbackTransaction();
      throw new BadRequestException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_CREATE.error(MODEL.ProductStock),
        },
        ACTION_CREATE.error(MODEL.ProductStock),
      );
    } finally {
      this.queryRunner.release();
    }
  }

  async findAll() {
    const filters = {};
    const relations = ['products'];

    try {
      const productStocks = await this.productStockRepository.find({
        where: filters,
        relations,
      });

      return {
        data: productStocks,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.ProductStock),
      };
    } catch (error) {
      this.logger.error(error?.message, error);
      throw new NotFoundException(
        {
          data: error,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_FIND.error(MODEL.ProductStock),
        },
        ACTION_FIND.error(MODEL.ProductStock),
      );
    }
  }

  async findOne(id: number) {
    const filters = { id };
    const relations = ['products'];

    try {
      const productStock: ProductStock =
        await this.productStockRepository.findOne({
          relations,
          where: filters,
        });

      if (!productStock)
        return new NotFoundException(
          {
            data: null,
            status: HttpStatus.NOT_FOUND,
            message: ACTION_FIND.error(MODEL.ProductStock, ONLY_ONE),
          },
          ACTION_FIND.error(MODEL.ProductStock, ONLY_ONE),
        );

      return {
        data: productStock,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.ProductStock, ONLY_ONE),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_FIND.error(MODEL.ProductStock, ONLY_ONE),
        },
        ACTION_FIND.error(MODEL.ProductStock),
      );
    }
  }

  async update(id: number, updateProductStockDto: UpdateProductStockDto) {
    const { product = null, ...toUpdate } = updateProductStockDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const productStock: ProductStock =
      await this.productStockRepository.preload({
        id,
        product,
        ...toUpdate,
      });

    if (!productStock)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.ProductStock),
        },
        ACTION_UPDATE.error(MODEL.ProductStock),
      );

    try {
      this.productStockRepository.save(productStock);

      await this.queryRunner.commitTransaction();

      return {
        data: productStock,
        statusCode: HttpStatus.OK,
        message: ACTION_UPDATE.success(MODEL.ProductStock),
      };
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_UPDATE.error(MODEL.ProductStock),
        },
        ACTION_UPDATE.error(MODEL.ProductStock),
      );
    } finally {
      await this.queryRunner.release();
    }
  }

  async remove(id: number) {
    const productStock = await this.productStockRepository.findOne({
      where: { id },
    });

    if (!productStock)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.ProductStock),
        },
        ACTION_REMOVE.error(MODEL.ProductStock),
      );
    try {
      const result = await this.productStockRepository.delete(id);

      return {
        data: result,
        statusCode: HttpStatus.OK,
        message: ACTION_REMOVE.success(MODEL.ProductStock),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_REMOVE.error(MODEL.ProductStock),
        },
        ACTION_REMOVE.error(MODEL.ProductStock),
      );
    }
  }
}
