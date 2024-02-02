import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtTokensDto } from './dtos/jwt-tokens.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneBy({ username });

    if (user == null || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }

    return await this.generateTokens(user.id, user.username);
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

    return await this.generateTokens(payload.sub, payload.username);
  }

  private async generateTokens(userId: string, username: string) {
    const payload = { sub: userId, username: username };

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
