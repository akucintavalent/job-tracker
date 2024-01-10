import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'job_tracker_user',
  password: 'job_tracker_password',
  database: 'job_tracker_db',
  entities: [],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => console.log('AppDataSource initialized'))
  .catch((error) =>
    console.error('AppDataSource initialization failed', error),
  );
