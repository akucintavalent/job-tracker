import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Board } from './../boards/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, Board])],
  providers: [ContactsService],
  controllers: [ContactsController],
})
export class ContactsModule {}
