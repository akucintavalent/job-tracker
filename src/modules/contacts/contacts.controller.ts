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
import { ContactsService } from './contacts.service';
import { FindContactDto } from './dtos/find-contact.dto';
import { CreateContactDto } from './dtos/create-contact.dto';
import { AssignContactToJobApplication } from './dtos/assign-contact-to-job-application.dto';
import { ContactDto } from './dtos/contact.dto';
import { UpdateContact } from './dtos/update-contact.dto';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all Contacts.' })
  @ApiParam({ name: 'contactId', required: false })
  @ApiParam({ name: 'boardId', required: false })
  @ApiResponse({
    status: 200,
    description: 'Contact records',
    type: [ContactDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async getContacts(@AuthUser() user: AuthUserDto, @Query() params: FindContactDto) {
    return await this.contactsService.find(user.userId, params);
  }

  @Post()
  @ApiOperation({ summary: 'Create Contact' })
  @ApiResponse({
    status: 201,
    description: 'Contact created',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async createContact(@Body() body: CreateContactDto, @AuthUser() user: AuthUserDto) {
    await this.contactsService.create(user.userId, body);
  }

  @Put()
  @ApiOperation({ summary: 'Updates Contact' })
  @ApiResponse({
    status: 201,
    description: 'Contact updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async updateContact(@Body() body: UpdateContact, @AuthUser() user: AuthUserDto) {
    await this.contactsService.update(user.userId, body);
  }

  @Post('/jobApplication/assign')
  @ApiOperation({ summary: 'Assigns Contact to JobApplication' })
  @ApiResponse({
    status: 201,
    description: 'Contact assigned',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async assignToJobApplication(
    @Body() body: AssignContactToJobApplication,
    @AuthUser() user: AuthUserDto,
  ) {
    await this.contactsService.assignContactToJobApplication(
      body.contactId,
      body.jobApplicationId,
      user.userId,
    );
  }

  @Delete('/jobApplication/unassign')
  @ApiOperation({ summary: 'Unassigns Contact from JobApplication' })
  @ApiResponse({
    status: 201,
    description: 'Contact assigned',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async unassignFromJobApplication(
    @Body() body: AssignContactToJobApplication,
    @AuthUser() user: AuthUserDto,
  ) {
    await this.contactsService.unassignContactFromJobApplication(
      body.contactId,
      body.jobApplicationId,
      user.userId,
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Deletes Contact' })
  @ApiResponse({
    status: 200,
    description: 'Contact deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async deleteContact(@Param('id', ParseUUIDPipe) id: string, @AuthUser() user: AuthUserDto) {
    await this.contactsService.delete(id, user.userId);
  }
}
