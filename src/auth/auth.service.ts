import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneBy({ username });

    if (user == null || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: 'jwt-secret',
        expiresIn: '1h',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: 'jwt-refresh-secret',
        expiresIn: '7d',
      }),
    };
  }

  async refreshToken(req: string): Promise<any> {
    const payload = await this.jwtService.verifyAsync(req, { secret: 'jwt-refresh-secret' });
    const newPayload = { sub: payload.sub, username: payload.username };

    return {
      accessToken: await this.jwtService.signAsync(newPayload, {
        secret: 'jwt-secret',
        expiresIn: '1h',
      }),
      refreshToken: await this.jwtService.signAsync(newPayload, {
        secret: 'jwt-refresh-secret',
        expiresIn: '7d',
      }),
    };
  }
}
