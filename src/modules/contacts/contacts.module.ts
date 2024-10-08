import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Board } from '../boards/entities/board.entity';
import { ContactMapper } from './mappers/contacts.mapper';
import { JobApplication } from '../job-applications/entities/job-application.entity';
import { ContactEmail } from './entities/contact-emails.entity';
import { ContactPhone } from './entities/contact-phones.entity';
import { ContactEmailMapper } from './mappers/contact-email.mapper';
import { ContactPhoneMapper } from './mappers/contact-phone.mapper';
import { ContactMethodsService } from './contact-methods.service';
import { ContactMethodsController } from './contact-method.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, ContactEmail, ContactPhone, Board, JobApplication])],
  providers: [
    ContactsService,
    ContactMethodsService,
    ContactMapper,
    ContactEmailMapper,
    ContactPhoneMapper,
  ],
  controllers: [ContactsController, ContactMethodsController],
  exports: [ContactsService],
})
export class ContactsModule {}
