import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUserDto } from 'src/auth/dtos/auth.user.dto';
import { AuthUser } from 'src/auth/user.decorator';
import { ContactsService } from './contacts.service';
import { FindContactDto } from './dtos/find-contact.dto';
import { ContactMapper } from './contacts.mapper';
import { CreateContactDto } from './dtos/create-contact.dto';

@ApiTags('contacts')
@Controller('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly contactService: ContactsService,
    private readonly contactMapper: ContactMapper,
  ) {}

  @Get('/find')
  async getAllContactsForBoard(@AuthUser() user: AuthUserDto, @Query() contact: FindContactDto) {
    const entities = await this.contactService.getAllContactsForBoard(user.userId, contact.boardId);
    return entities.map(this.contactMapper.toDto);
  }

  @Post()
  async createContact(@Body() body: CreateContactDto, @AuthUser() user: AuthUserDto) {
    await this.contactService.create(user.userId, body);
  }
}
