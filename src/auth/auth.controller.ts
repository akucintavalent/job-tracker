import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './public.decorator';
import { JwtTokensDto } from './dtos/jwt-tokens.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User Sign In' })
  @ApiResponse({ status: 200, description: 'Signed in', type: JwtTokensDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @Get('refresh')
  @ApiOperation({ summary: 'Refresh Access token' })
  @ApiResponse({ status: 200, description: 'Token is updated', type: JwtTokensDto })
  @ApiResponse({ status: 401, description: 'Invalid token' })
  async refreshToken(@Request() req: any) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException();
    }

    return await this.authService.refreshToken(token);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
