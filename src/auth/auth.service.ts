import * as bcrypt from 'bcrypt';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtTokensDto } from './dtos/jwt-tokens.dto';
import { ConfigService } from '@nestjs/config';
import { UserFriendlyErrorMessages } from 'src/exceptions/user-frienly-error-messages';
import { CustomHttpException } from 'src/exceptions/custom.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneBy({ email });

    if (user == null || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }

    if (!user.isEmailVerified)
      throw new CustomHttpException(
        'Email is not verified',
        HttpStatus.FORBIDDEN,
        UserFriendlyErrorMessages.EMAIL_NOT_VERIFIED,
      );

    return await this.generateTokens(user.id, user.email);
  }

  async refreshToken(req: string): Promise<any> {
    let payload = null;
    try {
      payload = await this.jwtService.verifyAsync(req, {
        secret: this.configService.get('JWT_REFRESH_TOKEN'),
      });
    } catch (JsonWebTokenError) {
      throw new UnauthorizedException();
    }

    return await this.generateTokens(payload.sub, payload.email);
  }

  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email: email };

    return new JwtTokensDto({
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_ACCESS_TOKEN'),
        expiresIn: '1h',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_TOKEN'),
        expiresIn: '7d',
      }),
    });
  }
}
