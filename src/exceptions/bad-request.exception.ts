import { CustomHttpException } from './custom.exception';
import { HttpStatus } from '@nestjs/common';
import { UserFriendlyErrorMessages } from './user-friendly-error-messages';

export class BadRequestException extends CustomHttpException {
  constructor(message: string, userFriendlyMessage?: UserFriendlyErrorMessages) {
    super(message, HttpStatus.BAD_REQUEST, userFriendlyMessage);
  }
}
