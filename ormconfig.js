const path = require('path'); // eslint-disable-line

module.exports = {
  type: 'mysql',
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: [path.resolve(__dirname, 'src/**/*.entity.{js,ts}')],
  migrations: [path.resolve(__dirname, 'src/database/migrations/*{.ts,.js}')],
  seeds: [path.resolve(__dirname, 'src/database/seeders/**/*{.ts,.js}')],
  factories: [path.resolve(__dirname, 'src/database/factories/**/*{.ts,.js}')],
  logger: 'advanced-console',
  logging: ['warn', 'error'],
  cli: {
    migrationsDir: path.resolve('src/database/migrations'),
  },
  dropSchema: Boolean(process.env.TYPEORM_DROP_SCHEMA_CONFIG) || false,
  synchronize: false, //Boolean(process.env.TYPEORM_SYNCHRONIZE) || true,
  migrationsRun: Boolean(process.env.TYPEORM_MIGRATIONS_RUN) || true,
};
