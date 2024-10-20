import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { newGuid } from '../utils/guid';
import { CustomHttpException } from './custom.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const exceptionId = newGuid();
    console.error(
      `ExceptionId: ${exceptionId},`,
      {
        method: request.method,
        endpoint: request.url,
        params: request.params,
        query: request.query,
        headers: {
          authorization: request.headers.authorization,
          contentType: request.headers['content-type'],
        },
        body: request.body,
      },
      exception,
    );

    try {
      if (exception instanceof CustomHttpException) {
        response
          .status(exception.getStatus())
          .json(this.formResponse(exceptionId, exception.message, exception.userFriendlyMessage));
        return;
      }

      if (exception.getStatus() == 401) {
        response
          .status(exception.getStatus())
          .json(this.formResponse(exceptionId, 'Unauthorized', null, null));
        return;
      }

      // Catch DTO validation exception from `class-validator`
      type ClassValidatorResponse = { message: string[] };
      const classValidatorResponse = exception.getResponse() as ClassValidatorResponse;
      response
        .status(exception.getStatus())
        .json(
          this.formResponse(
            exceptionId,
            'Validation exception',
            null,
            classValidatorResponse.message,
          ),
        );
    } catch {
      // Unhandled exception. Posible reasons: exception.getStatus() or exception.getResponse() might be null
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(this.formResponse(exceptionId, 'Unhandled exception occurred'));
    }
  }

  private formResponse(
    exceptionId: string,
    message: string,
    userFriendlyMessage: string = null,
    details: string[] = null,
  ) {
    return { exceptionId, message, userFriendlyMessage, details };
  }
}
