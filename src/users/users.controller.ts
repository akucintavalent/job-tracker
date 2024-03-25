import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
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
import { Public } from 'src/auth/public.decorator';
import { AuthUser } from 'src/auth/user.decorator';
import { AuthUserDto } from 'src/auth/dtos/auth.user.dto';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mapper: UserMapper,
  ) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: 'User record', type: UserDto })
  @ApiResponse({ status: 400, description: 'Validation error or user already exists' })
  async createUser(@Body() body: CreateUserDto) {
    if (!body.role) body.role = 'user';
    const entity = await this.usersService.create(body);
    return this.mapper.toDto(entity);
  }

  @Get('/find')
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

  @Get()
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
  async getUserDetails(@AuthUser() user: AuthUserDto) {
    const id = user.userId;
    const entity = await this.usersService.findOneBy({ id });
    return this.mapper.toDto(entity);
  }

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'User updated',
    type: UserDto,
  })
  async updateUser(@AuthUser() user: AuthUserDto, @Body() body: UpdateUserDto) {
    const entity = await this.usersService.update(user.userId, body);
    return this.mapper.toDto(entity);
  }

  @Delete()
  async deleteUser(@AuthUser() user: AuthUserDto) {
    await this.usersService.remove(user.userId);
  }
}
