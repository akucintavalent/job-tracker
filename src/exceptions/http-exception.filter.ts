import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { Guid } from '../models/Guid';
import { CustomHttpException } from './custom.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // TODO: we are getting error here in case of DB exception
    // TypeError: exception.getStatus is not a function
    // exception is class QueryFailedError
    const status = exception.getStatus();

    const exceptionId = Guid.newGuid();
    console.error(`ExceptionId: ${exceptionId},`, exception);

    if (exception instanceof CustomHttpException) {
      response.status(status).json({
        exceptionId: exceptionId,
        message: exception.message,
        errorCode: exception.errorCode,
      });
      return;
    }

    response.status(status).json(exception.getResponse());
  }
}
