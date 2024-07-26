import { Injectable } from '@nestjs/common';
import { AuthUserDto } from './dtos/auth.user.dto';

// Maps JWT payload into AuthUser model.
// Current JWT payload example:
//{
//  sub: "07b72ebb-7f47-42cf-8e92-1ecb494226f8",
//  email: "1234@email.com",
//  iat: 1711384501,
//  exp: 1711388101,
//}
@Injectable()
export class AuthUserMapper {
  toAuthUserDto(payload: any) {
    const authUser = new AuthUserDto();
    authUser.userId = payload.sub;
    authUser.email = payload.email;
    return authUser;
  }
}
