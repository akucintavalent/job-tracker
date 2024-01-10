import { DataSource } from 'typeorm';
import { getDataSourceOptions } from '../database.config';

console.log(getDataSourceOptions());

export const AppDataSource = new DataSource(getDataSourceOptions());

AppDataSource.initialize()
  .then(() => console.log('AppDataSource initialized'))
  .catch((error) =>
    console.error('AppDataSource initialization failed', error),
  );
