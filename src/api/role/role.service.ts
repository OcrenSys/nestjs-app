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
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from '../../database/models/role.entity';

@Injectable()
export class RoleService {
  private readonly logger: Logger = new Logger('RoleService');
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const { ...toCreate } = createRoleDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const role = await this.roleRepository.create(toCreate);

      this.roleRepository.save(role);

      await this.queryRunner.commitTransaction();

      return {
        data: role,
        statusCode: HttpStatus.CREATED,
        message: ACTION_CREATE.success(MODEL.Role),
      };
    } catch (error) {
      this.queryRunner.rollbackTransaction();
      throw new BadRequestException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_CREATE.error(MODEL.Role),
        },
        ACTION_CREATE.error(MODEL.Role),
      );
    } finally {
      this.queryRunner.release();
    }
  }

  async findAll() {
    const filters = {};
    const relations = ['users'];

    try {
      const roles = await this.roleRepository.find({
        where: filters,
        relations,
      });

      return {
        data: roles,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.Role),
      };
    } catch (error) {
      this.logger.error(error?.message, error);
      throw new NotFoundException(
        {
          data: error,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_FIND.error(MODEL.Role),
        },
        ACTION_FIND.error(MODEL.Role),
      );
    }
  }

  async findOne(id: number) {
    const filters = { id };
    const relations = ['users'];

    try {
      const role: Role = await this.roleRepository.findOne({
        relations,
        where: filters,
      });

      if (!role)
        return new NotFoundException(
          {
            data: null,
            status: HttpStatus.NOT_FOUND,
            message: ACTION_FIND.error(MODEL.Role, ONLY_ONE),
          },
          ACTION_FIND.error(MODEL.Role, ONLY_ONE),
        );

      return {
        data: role,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.Role, ONLY_ONE),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_FIND.error(MODEL.Role, ONLY_ONE),
        },
        ACTION_FIND.error(MODEL.Role),
      );
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { ...toUpdate } = updateRoleDto;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const role: Role = await this.roleRepository.preload({
      id,
      ...toUpdate,
    });

    if (!role)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.Role),
        },
        ACTION_UPDATE.error(MODEL.Role),
      );

    try {
      this.roleRepository.save(role);

      await this.queryRunner.commitTransaction();

      return {
        data: role,
        statusCode: HttpStatus.OK,
        message: ACTION_UPDATE.success(MODEL.Role),
      };
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_UPDATE.error(MODEL.Role),
        },
        ACTION_UPDATE.error(MODEL.Role),
      );
    } finally {
      await this.queryRunner.release();
    }
  }

  async remove(id: number) {
    const role = await this.roleRepository.findOne({
      where: { id },
    });

    if (!role)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_UPDATE.error(MODEL.Role),
        },
        ACTION_REMOVE.error(MODEL.Role),
      );
    try {
      const result = await this.roleRepository.delete(id);

      return {
        data: result,
        statusCode: HttpStatus.OK,
        message: ACTION_REMOVE.success(MODEL.Role),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_REMOVE.error(MODEL.Role),
        },
        ACTION_REMOVE.error(MODEL.Role),
      );
    }
  }
}
