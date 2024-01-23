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
import { UserMapper } from './users.mapper';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mapper: UserMapper,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: 'User record', type: UserDto })
  @ApiResponse({ status: 400, description: 'Validation error or user already exists' })
  async createUser(@Body() body: CreateUserDto) {
    const entity = await this.usersService.create(body);
    return this.mapper.toDto(entity);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all users' })
  @ApiResponse({
    status: 200,
    description: 'User records',
    type: [UserDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async findUsers(@Query() query: FindUsersDto) {
    const entities = await this.usersService.findBy(query);
    return entities.map(this.mapper.toDto);
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
  async findUserById(@Param('id', ParseUUIDPipe) id: string) {
    const entity = await this.usersService.findOneBy({ id });
    return this.mapper.toDto(entity);
  }

  @Patch('/:id')
  @ApiResponse({
    status: 200,
    description: 'User updated',
    type: UserDto,
  })
  async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateUserDto) {
    const entity = await this.usersService.update(id, body);
    return this.mapper.toDto(entity);
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    await this.usersService.remove(id);
  }
}
