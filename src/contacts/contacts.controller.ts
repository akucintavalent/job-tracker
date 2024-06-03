import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUserDto } from 'src/auth/dtos/auth.user.dto';
import { AuthUser } from 'src/auth/user.decorator';
import { ContactsService } from './contacts.service';
import { FindContactDto } from './dtos/find-contact.dto';

@ApiTags('contacts')
@Controller('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactService: ContactsService) {}

  @Get('/find')
  getAllContactsForBoard(@AuthUser() user: AuthUserDto, @Query() contact: FindContactDto) {
    return this.contactService.getAllContactsForBoard(user.userId, contact.boardId);
  }
}
