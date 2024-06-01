import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../constants/error-codes';

export class CustomHttpException extends HttpException {
  public readonly errorCode: ErrorCode;
  constructor(message: string, httpStatus: HttpStatus, errorCode: ErrorCode) {
    super(message, httpStatus);
    this.errorCode = errorCode;
  }
}
