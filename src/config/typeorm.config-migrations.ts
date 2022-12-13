import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  /**   RUNNING IN COMMAND LINE  */
  /*  
    host: 'localhost',
    username: 'smbs',
    database: 'inventory',
    password: '12345678',
    port: 3306, 
  */
  /**   RUNNING IN DOCKER COMPOSE  */
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT, 10),

  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
  synchronize: false,
  logging: true,
});
