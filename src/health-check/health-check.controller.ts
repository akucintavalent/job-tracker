import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';

@Controller('health-check')
export class HealthCheckController {
  constructor(private healthCheckService: HealthCheckService) {}

  @Get()
  async healthCheck() {
    const isConnected = await this.healthCheckService.isDbConnected();

    if (isConnected) {
      return 'OK';
    } else {
      return 'NOT OK';
    }
  }
}
