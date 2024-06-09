import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Guid } from '../models/Guid';
import { CustomHttpException } from './custom.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exceptionId = Guid.newGuid();
    console.error(`ExceptionId: ${exceptionId},`, exception);

    if (exception instanceof CustomHttpException) {
      response.status(exception.getStatus()).json({
        exceptionId: exceptionId,
        message: exception.message,
        errorCode: exception.errorCode,
      });
      return;
    }

    try {
      // class-validator has their own response message. This line returns their error
      response.status(exception.getStatus()).json(exception.getResponse());
    } catch {
      // Unhandled exception. exception.getStatus() or exception.getResponse() might be null
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ exceptionId: exceptionId, message: 'Unhandled exception occurred' });
    }
  }
}
