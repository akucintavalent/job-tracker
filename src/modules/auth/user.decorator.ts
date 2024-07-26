import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((_data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
