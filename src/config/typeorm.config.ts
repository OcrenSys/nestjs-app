import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
// import Options from '../common/constants/datasource.options';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    const dataSourceAndSeederOptions: DataSourceOptions & SeederOptions = {
      // ...Options,
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'mysql',
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      username: process.env.DATABASE_USERNAME || 'root',
      database: process.env.DATABASE_NAME || 'inventory',
      password: process.env.DATABASE_PASSWORD || '12345678',
      entities: [`${__dirname}/../**/*.entity.{js,ts}`],
      migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      logging: true,
      synchronize: true,
      dropSchema: false,
      migrationsRun: false,
    };
    return dataSourceAndSeederOptions;
  },
};

const typeOrmConfig: TypeOrmModuleOptions = {
  // ...Options,
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'mysql',
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USERNAME || 'root',
  database: process.env.DATABASE_NAME || 'inventory',
  password: process.env.DATABASE_PASSWORD || '12345678',
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  logging: true,
  synchronize: true,
  dropSchema: false,
  migrationsRun: false,
  autoLoadEntities: true,
};

export default () => typeOrmConfig;
