import { HttpException, HttpStatus } from '@nestjs/common';
import { UserFriendlyErrorMessages } from './user-frienly-error-messages';

export class CustomHttpException extends HttpException {
  public readonly userFiendlyMessage: UserFriendlyErrorMessages;
  constructor(
    message: string,
    httpStatus: HttpStatus,
    userFiendlyMessage?: UserFriendlyErrorMessages,
  ) {
    super(message, httpStatus);
    this.userFiendlyMessage = userFiendlyMessage;
  }
}
