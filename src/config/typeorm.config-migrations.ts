import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  username: 'root',
  database: 'inventory-db',
  password: '12345678',
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
  synchronize: false,
  logging: true,
});
