import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUsersDto } from './dtos/find-users.dto';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 200, description: 'User record', type: CreateUserDto })
  @ApiResponse({
    status: 400,
    description: 'Validation error or user is already exists',
  })
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get()
  findUsers(@Query() query: FindUsersDto) {
    return this.usersService.findBy(query);
  }

  @Get('/:id')
  findUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneBy({ id });
  }
}
