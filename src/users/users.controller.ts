import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserDto } from './dtos/find-user.dto';

@ApiTags('users')
@Controller('users')
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

  @Get('/find')
  findUserByUsername(@Query() query: FindUserDto) {
    console.log(query);
    return this.usersService.findOne(query);
  }

  @Get('/:id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }
}
