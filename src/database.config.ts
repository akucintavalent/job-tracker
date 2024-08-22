import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { User } from './modules/users/entities/user.entity';
import { Board } from './modules/boards/entities/board.entity';
import { BoardColumn } from './modules/board-columns/entities/board-column.entity';
import { JobApplication } from './modules/job-applications/entities/job-application.entity';
import { UserCodeVerification } from './modules/users/entities/user.code.verification.entity';
import { Contact } from './modules/contacts/entities/contact.entity';
import { ContactEmail } from './modules/contacts/entities/contact-emails.entity';
import { ContactPhone } from './modules/contacts/entities/contact-phones.entity';
import { JobApplicationNote } from './modules/job-applications/entities/job-application-note.entity';

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
  entities: [
    User,
    Board,
    BoardColumn,
    JobApplication,
    JobApplicationNote,
    UserCodeVerification,
    Contact,
    ContactEmail,
    ContactPhone,
  ],
  migrations: ['dist/migrations/**/*.js'],
  migrationsRun: false,
  synchronize: false,
  logging: ['query', 'warn', 'error'],
});

export default getDataSourceOptions;
