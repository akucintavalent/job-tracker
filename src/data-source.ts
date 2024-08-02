import { DataSource } from 'typeorm';
import { getDataSourceOptions } from './database.config';

export const AppDataSource = new DataSource(getDataSourceOptions());
