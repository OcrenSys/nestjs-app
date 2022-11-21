export default () => ({
  /*--------------------------------------------------------------------------
| data source options to database connections
|--------------------------------------------------------------------------
|
| Here is the configuration values to database connections
|--------------------------------------------------------------------------*/
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USERNAME || 'root',
  database: process.env.DATABASE_NAME || 'inventory',
  password: process.env.DATABASE_PASSWORD || '12345678',
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
});
