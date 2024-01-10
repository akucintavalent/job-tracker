import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'test') {
  config();
} else {
  config({ path: '.env.test' });
}

export const getDataSourceOptions = (): DataSourceOptions =>
  process.env.NODE_ENV === 'test'
    ? {
        type: 'sqlite',
        database: process.env.DB_NAME,
        entities: [],
        synchronize: true,
      }
    : {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [],
        synchronize: true,
      };

export default getDataSourceOptions;
