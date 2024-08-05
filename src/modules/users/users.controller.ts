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
import { Public } from '../auth/public.decorator';
import { AuthUser } from '../auth/user.decorator';
import { AuthUserDto } from '../auth/dtos/auth.user.dto';
import { UserCodeVerificationService } from './user-code-verification.service';
import { EmailVerificationCodeDto } from './dtos/email-verification-code.dto';
import { CreateEmailVerificationCode } from './dtos/create-email-verification-code.dto';
import { VerificationProcess } from './enums/verification-process.enum';
import { DeleteUserDto } from './dtos/delete-user.dto';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mapper: UserMapper,
    private readonly codeVerification: UserCodeVerificationService,
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

  @Post('/delete/create-verification-code')
  @ApiOperation({
    summary: "Creates & sends user's code. Must be called before DELETE `/users`",
  })
  @ApiResponse({
    status: 201,
    description: 'User code created and sent',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async createVerificationCode(@AuthUser() user: AuthUserDto) {
    await this.codeVerification.createAndSendVerificationCode(
      user.email,
      VerificationProcess.USER_DELETE,
    );
  }

  @Delete()
  @ApiOperation({
    summary:
      'Permanently deletes user from the system. Must be called after POST `/users/delete/create-verification-code`',
  })
  @ApiResponse({
    status: 201,
    description: 'User deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async deleteUser(@Body() dto: DeleteUserDto, @AuthUser() user: AuthUserDto) {
    await this.usersService.remove(user.userId, dto.code);
  }

  @Public()
  @Post('/verification/create-email-verification-code')
  async createEmailVerificationCode(@Body() body: CreateEmailVerificationCode) {
    await this.codeVerification.createAndSendVerificationCode(
      body.email,
      VerificationProcess.USER_SIGNUP,
    );
  }

  @Public()
  @Post('/verification/verify-email-code')
  async verifyEmailCode(@Body() body: EmailVerificationCodeDto) {
    await this.usersService.updateIsEmailVerified(body);
  }
}
