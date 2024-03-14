import { Request, Response } from "express";
import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from "@nestjs/common";

import { getDateWithTimeString } from "../utilities/date-utils";

@Catch()
export class TakeAwaitExceptionFilter implements ExceptionFilter {
  private logger = new Logger("AllExceptionsFilter");

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const absoluteFilePath = exception.stack.split("\n")[1].split("(")[1].split(")")[0];
    const srcIndex = absoluteFilePath.indexOf("src");
    const relativeFilePath =
      srcIndex !== -1 ? absoluteFilePath.substring(srcIndex) : absoluteFilePath;

    const errorResponse = {
      timestamp: getDateWithTimeString(new Date()),
      path: request.url,
      file: relativeFilePath,
      message: exception.message || "Internal server error",
      statusCode: status,
    };

    this.logger.error(`Exception: ${JSON.stringify(errorResponse)}`, exception.stack);

    response.status(status).json(errorResponse);
  }
}
