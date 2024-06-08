import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Board } from './../boards/entities/board.entity';
import { ContactMapper } from './contacts.mapper';
import { JobApplication } from '../job-applications/entities/job-application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, Board, JobApplication])],
  providers: [ContactsService, ContactMapper],
  controllers: [ContactsController],
})
export class ContactsModule {}
