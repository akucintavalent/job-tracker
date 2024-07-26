import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { UsersModule } from './modules/users/users.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { getDataSourceOptions } from '../database.config';
import { BoardsModule } from './modules/boards/boards.module';
import { BoardColumnsModule } from './modules/board-columns/board-columns.module';
import { JobApplicationsModule } from './modules/job-applications/job-applications.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmailSenderModule } from './modules/email-sender/email-sender.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { ContactsModule } from './modules/contacts/contacts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...getDataSourceOptions(),
    }),
    HealthCheckModule,
    UsersModule,
    BoardsModule,
    BoardColumnsModule,
    JobApplicationsModule,
    AuthModule,
    EmailSenderModule,
    ContactsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
