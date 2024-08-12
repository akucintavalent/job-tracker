import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserDto } from '../auth/dtos/auth.user.dto';
import { AuthUser } from '../auth/user.decorator';
import { ContactMethodsService } from './contact-methods.service';
import { ContactEmailMapper } from './mappers/contact-email.mapper';
import { CreateContactPhoneDto } from './dtos/contact-method/create-contact-method-phone.dto';
import { ContactPhoneMapper } from './mappers/contact-phone.mapper';
import { ContactMethodEmailDto } from './dtos/contact-method/contact-method-email.dto';
import { ContactMethodPhoneDto } from './dtos/contact-method/contact-method-phone.dto';
import { CreateContactEmailDto } from './dtos/contact-method/create-contact-method-email.dto';

@ApiTags('contacts')
@Controller('contacts')
export class ContactMethodController {
  constructor(
    private readonly contactMethodService: ContactMethodsService,
    private readonly contactEmailMapper: ContactEmailMapper,
    private readonly contactPhoneMapper: ContactPhoneMapper,
  ) {}

  @Get('/contact-method/email/:id')
  @ApiOperation({ summary: 'Gets all email contact method from a Contact' })
  @ApiResponse({
    status: 201,
    description: "Contact's email added",
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async getContactMethodEmail(
    @Param('id', ParseUUIDPipe) contactId: string,
    @AuthUser() user: AuthUserDto,
  ) {
    const entities = await this.contactMethodService.getContactMethodEmails(contactId, user.userId);
    return entities.map(this.contactEmailMapper.toDto);
  }

  @Get('/contact-method/phone/:id')
  @ApiOperation({ summary: 'Gets phone contact method from a Contact' })
  @ApiResponse({
    status: 201,
    description: "Contact's phone added",
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async getContactMethodPhone(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser() user: AuthUserDto,
  ) {
    const entities = await this.contactMethodService.getContactMethodPhones(id, user.userId);
    return entities.map(this.contactPhoneMapper.toDto);
  }

  @Post('/contact-method/email')
  @ApiOperation({ summary: 'Adds email contact method for a Contact' })
  @ApiResponse({
    status: 201,
    description: "Contact's email added",
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async createContactMethodEmail(
    @Body() body: CreateContactEmailDto,
    @AuthUser() user: AuthUserDto,
  ) {
    const entity = await this.contactMethodService.createContactMethodEmail(body, user.userId);
    return this.contactEmailMapper.toDto(entity);
  }

  @Post('/contact-method/phone')
  @ApiOperation({ summary: 'Adds phone contact method for a Contact' })
  @ApiResponse({
    status: 201,
    description: "Contact's phone added",
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async createContactMethodPhone(
    @Body() body: CreateContactPhoneDto,
    @AuthUser() user: AuthUserDto,
  ) {
    const entity = await this.contactMethodService.createContactMethodPhone(body, user.userId);
    return this.contactPhoneMapper.toDto(entity);
  }

  @Put('/contact-method/email')
  @ApiOperation({ summary: 'Updates email contact method for a Contact' })
  @ApiResponse({
    status: 201,
    description: "Contact's email updated",
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async updateContactMethodEmail(
    @Body() body: ContactMethodEmailDto,
    @AuthUser() user: AuthUserDto,
  ) {
    const entity = await this.contactMethodService.updateContactMethodEmail(body, user.userId);
    return this.contactEmailMapper.toDto(entity);
  }

  @Put('/contact-method/phone')
  @ApiOperation({ summary: 'Updates phone contact method for a Contact' })
  @ApiResponse({
    status: 201,
    description: "Contact's phone updated",
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async updateContactMethodPhone(
    @Body() body: ContactMethodPhoneDto,
    @AuthUser() user: AuthUserDto,
  ) {
    const entity = await this.contactMethodService.updateContactMethodPhone(body, user.userId);
    return this.contactPhoneMapper.toDto(entity);
  }

  @Delete('/contact-method/email/:id')
  @ApiOperation({ summary: 'Deletes email contact method for a Contact' })
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
  @ApiOperation({ summary: 'Deletes phone contact method for a Contact' })
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
