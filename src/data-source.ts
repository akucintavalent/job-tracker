import { DataSource } from 'typeorm';
import { getDataSourceOptions } from '../database.config';

export const AppDataSource = new DataSource(getDataSourceOptions());

AppDataSource.initialize()
  .then(() => console.log('AppDataSource initialized'))
  .catch((error) =>
    console.error('AppDataSource initialization failed', error),
  );
