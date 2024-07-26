import { BadRequestException as ConflictException } from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
  constructor(message: string) {
    super(message);
  }
}
