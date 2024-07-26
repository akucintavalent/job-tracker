import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { User } from './src/modules/users/entities/user.entity';
import { Board } from './src/modules/boards/entities/board.entity';
import { BoardColumn } from './src/modules/board-columns/entities/board-column.entity';
import { JobApplication } from './src/modules/job-applications/entities/job-application.entity';
import { UserCodeVerification } from './src/modules/users/entities/user.code.verification.entity';
import { Contact } from './src/modules/contacts/entities/contact.entity';

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
  entities: [User, Board, BoardColumn, JobApplication, UserCodeVerification, Contact],
  migrations: ['dist/src/migrations/*.js'],
  migrationsRun: false,
  synchronize: false,
  logging: ['query', 'warn', 'error'],
});

export default getDataSourceOptions;
