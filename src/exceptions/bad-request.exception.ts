import { CustomHttpException } from './custom.exception';
import { HttpStatus } from '@nestjs/common';
import { UserFriendlyErrorMessages } from './user-frienly-error-messages';

export class BadRequestException extends CustomHttpException {
  constructor(message: string, userFiendlyMessage?: UserFriendlyErrorMessages) {
    super(message, HttpStatus.BAD_REQUEST, userFiendlyMessage);
  }
}
