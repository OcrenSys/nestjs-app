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
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from '../../database/models/customer.entity';

@Injectable()
export class CustomerService {
  private readonly logger: Logger = new Logger('CustomerService');
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { ...toCreate } = createCustomerDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const customer = await this.customerRepository.create(toCreate);

      this.customerRepository.save(customer);

      await this.queryRunner.commitTransaction();

      return {
        data: customer,
        statusCode: HttpStatus.CREATED,
        message: ACTION_CREATE.success(MODEL.Customer),
      };
    } catch (error) {
      this.queryRunner.rollbackTransaction();
      throw new BadRequestException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_CREATE.error(MODEL.Customer),
        },
        ACTION_CREATE.error(MODEL.Customer),
      );
    } finally {
      this.queryRunner.release();
    }
  }

  async findAll() {
    const filters = {};
    const relations = [];

    try {
      const customers = await this.customerRepository.find({
        where: filters,
        relations,
      });

      return {
        data: customers,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.Customer),
      };
    } catch (error) {
      this.logger.error(error?.message, error);
      throw new NotFoundException(
        {
          data: error,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_FIND.error(MODEL.Customer),
        },
        ACTION_FIND.error(MODEL.Customer),
      );
    }
  }

  async findOne(id: number) {
    const filters = { id };
    const relations = [];

    try {
      const customer: Customer = await this.customerRepository.findOne({
        relations,
        where: filters,
      });

      if (!customer)
        return new NotFoundException(
          {
            data: null,
            status: HttpStatus.NOT_FOUND,
            message: ACTION_FIND.error(MODEL.Customer, ONLY_ONE),
          },
          ACTION_FIND.error(MODEL.Customer, ONLY_ONE),
        );

      return {
        data: customer,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.Customer, ONLY_ONE),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_FIND.error(MODEL.Customer, ONLY_ONE),
        },
        ACTION_FIND.error(MODEL.Customer),
      );
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const { ...toUpdate } = updateCustomerDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const customer: Customer = await this.customerRepository.preload({
      id,
      ...toUpdate,
    });

    if (!customer)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.Customer),
        },
        ACTION_UPDATE.error(MODEL.Customer),
      );

    try {
      this.customerRepository.save(customer);

      await this.queryRunner.commitTransaction();

      return {
        data: customer,
        statusCode: HttpStatus.OK,
        message: ACTION_UPDATE.success(MODEL.Customer),
      };
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_UPDATE.error(MODEL.Customer),
        },
        ACTION_UPDATE.error(MODEL.Customer),
      );
    } finally {
      await this.queryRunner.release();
    }
  }

  async remove(id: number) {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });

    if (!customer)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.Customer),
        },
        ACTION_REMOVE.error(MODEL.Customer),
      );
    try {
      const result = await this.customerRepository.delete(id);

      return {
        data: result,
        statusCode: HttpStatus.OK,
        message: ACTION_REMOVE.success(MODEL.Customer),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_REMOVE.error(MODEL.Customer),
        },
        ACTION_REMOVE.error(MODEL.Customer),
      );
    }
  }
}
