import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { User } from './src/users/user.entity';

if (process.env.NODE_ENV !== 'test') {
  config();
} else {
  config({ path: '.env.test' });
}

export const getDataSourceOptions = (): DataSourceOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User],
  migrations: ['dist/src/migrations/*.js'],
  migrationsRun: false,
  synchronize: false,
});

export default getDataSourceOptions;
