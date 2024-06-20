import { HttpException, HttpStatus } from '@nestjs/common';
import { UserFriendlyErrorMessages } from './user-friendly-error-messages';

export class CustomHttpException extends HttpException {
  public readonly userFriendlyMessage: UserFriendlyErrorMessages;
  constructor(
    message: string,
    httpStatus: HttpStatus,
    userFriendlyMessage?: UserFriendlyErrorMessages,
  ) {
    super(message, httpStatus);
    this.userFriendlyMessage = userFriendlyMessage;
  }
}
