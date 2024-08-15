import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserDto } from '../auth/dtos/auth.user.dto';
import { AuthUser } from '../auth/user.decorator';
import { ContactMethodsService } from './contact-methods.service';
import { ContactEmailMapper } from './mappers/contact-email.mapper';
import { CreateContactPhoneDto } from './dtos/contact-method/create-contact-phone.dto';
import { ContactPhoneMapper } from './mappers/contact-phone.mapper';
import { ContactEmailDto } from './dtos/contact-method/contact-email.dto';
import { ContactPhoneDto } from './dtos/contact-method/contact-phone.dto';
import { CreateContactEmailDto } from './dtos/contact-method/create-contact-email.dto';

@ApiTags('contacts')
@Controller('contacts')
export class ContactMethodsController {
  constructor(
    private readonly contactMethodService: ContactMethodsService,
    private readonly contactEmailMapper: ContactEmailMapper,
    private readonly contactPhoneMapper: ContactPhoneMapper,
  ) {}

  @Get('/contact-method/email')
  @ApiOperation({ summary: 'Gets all email contact methods from a contact' })
  @ApiParam({ name: 'contactId', required: true })
  @ApiResponse({
    status: 200,
    description: "Contact's email added",
    type: [ContactEmailDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async getContactMethodEmail(
    @Query('contactId', ParseUUIDPipe) contactId: string,
    @AuthUser() user: AuthUserDto,
  ) {
    const entities = await this.contactMethodService.getContactMethodEmails(contactId, user.userId);
    return entities.map(this.contactEmailMapper.toDto);
  }

  @Get('/contact-method/phone')
  @ApiOperation({ summary: 'Gets all phone contact methods from a contact' })
  @ApiParam({ name: 'contactId', required: true })
  @ApiResponse({
    status: 200,
    description: "Contact's phone added",
    type: [ContactPhoneDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async getContactMethodPhone(
    @Query('contactId', ParseUUIDPipe) contactId: string,
    @AuthUser() user: AuthUserDto,
  ) {
    const entities = await this.contactMethodService.getContactMethodPhones(contactId, user.userId);
    return entities.map(this.contactPhoneMapper.toDto);
  }

  @Post('/contact-method/email')
  @ApiOperation({ summary: 'Adds email contact methods from a contact' })
  @ApiResponse({
    status: 201,
    description: "Contact's email added",
    type: [ContactEmailDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async createContactMethodEmail(
    @Body() contactEmailDto: CreateContactEmailDto,
    @AuthUser() user: AuthUserDto,
  ) {
    const entity = await this.contactMethodService.createContactMethodEmail(
      contactEmailDto,
      user.userId,
    );
    return this.contactEmailMapper.toDto(entity);
  }

  @Post('/contact-method/phone')
  @ApiOperation({ summary: 'Adds phone contact methods for a contact' })
  @ApiResponse({
    status: 201,
    description: "Contact's phone added",
    type: [ContactPhoneDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async createContactMethodPhone(
    @Body() contactPhoneDto: CreateContactPhoneDto,
    @AuthUser() user: AuthUserDto,
  ) {
    const entity = await this.contactMethodService.createContactMethodPhone(
      contactPhoneDto,
      user.userId,
    );
    return this.contactPhoneMapper.toDto(entity);
  }

  @Put('/contact-method/email')
  @ApiOperation({ summary: 'Updates email contact methods from a contact' })
  @ApiResponse({
    status: 201,
    description: "Contact's email updated",
    type: [ContactEmailDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async updateContactMethodEmail(
    @Body() contactEmailDto: ContactEmailDto,
    @AuthUser() user: AuthUserDto,
  ) {
    const entity = await this.contactMethodService.updateContactMethodEmail(
      contactEmailDto,
      user.userId,
    );
    return this.contactEmailMapper.toDto(entity);
  }

  @Put('/contact-method/phone')
  @ApiOperation({ summary: 'Updates phone contact methods for a contact' })
  @ApiResponse({
    status: 201,
    description: "Contact's phone updated",
    type: [ContactPhoneDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async updateContactMethodPhone(
    @Body() contactPhoneDto: ContactPhoneDto,
    @AuthUser() user: AuthUserDto,
  ) {
    const entity = await this.contactMethodService.updateContactMethodPhone(
      contactPhoneDto,
      user.userId,
    );
    return this.contactPhoneMapper.toDto(entity);
  }

  @Delete('/contact-method/email/:id')
  @ApiOperation({ summary: 'Deletes email contact methods from a contact' })
  @ApiResponse({
    status: 201,
    description: "Contact's email updated",
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async deleteContactMethodEmail(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser() user: AuthUserDto,
  ) {
    await this.contactMethodService.deleteContactMethodEmail(id, user.userId);
  }

  @Delete('/contact-method/phone/:id')
  @ApiOperation({ summary: 'Deletes phone contact methods for a contact' })
  @ApiResponse({
    status: 201,
    description: "Contact's phone updated",
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async deleteContactMethodPhone(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser() user: AuthUserDto,
  ) {
    await this.contactMethodService.deleteContactMethodPhone(id, user.userId);
  }
}
