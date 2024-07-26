import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthCheckService {
  constructor(private dataSource: DataSource) {}

  async isDbConnected(): Promise<boolean> {
    try {
      await this.dataSource.query('SELECT 1');
      return true;
    } catch (error) {
      console.error('Database connection failed', error);
      return false;
    }
  }
}
