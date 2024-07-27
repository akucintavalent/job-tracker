import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from './custom.exception';

export class ArgumentInvalidException extends CustomHttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST, null);
  }
}
