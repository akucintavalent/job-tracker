import { ErrorCode } from 'src/constants/error-codes';
import { CustomHttpException } from './custom.exception';
import { HttpStatus } from '@nestjs/common';

export class BadRequestException extends CustomHttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, HttpStatus.BAD_REQUEST, errorCode);
  }
}
