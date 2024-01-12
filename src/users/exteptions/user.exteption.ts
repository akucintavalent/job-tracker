import { BadRequestException } from '@nestjs/common';

export class UserExeption extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
