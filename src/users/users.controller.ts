import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUsersDto } from './dtos/find-users.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: 'User record', type: UserDto })
  @ApiResponse({
    status: 400,
    description: 'Validation error or user already exists',
  })
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all users' })
  @ApiResponse({
    status: 200,
    description: 'User records',
    type: Array<UserDto>,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  findUsers(@Query() query: FindUsersDto) {
    return this.usersService.findBy(query);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Fetch user' })
  @ApiResponse({
    status: 200,
    description: 'User record',
    type: UserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  findUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneBy({ id });
  }

  @Patch('/:id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.update(id, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
