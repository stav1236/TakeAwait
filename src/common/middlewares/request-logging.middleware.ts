import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private logger = new Logger("RequestLogging");

  use(req: Request, res: Response, next: () => void) {
    this.logger.log(`Request: ${req.method} ${req.originalUrl}`);
    next();
  }
}
