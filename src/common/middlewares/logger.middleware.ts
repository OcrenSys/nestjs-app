import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CreateLoggerDto } from '../../api/logger/dto/create-logger.dto';
import { LoggerService } from '../../api/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const createLoggerDto: CreateLoggerDto = {
      message: req?.statusMessage || '',
      headers: JSON.stringify(req?.headers) || '',
      body: JSON.stringify(req?.body) || '',
      url: req?.originalUrl || '',
      user: null,
    };

    this.loggerService.create(createLoggerDto);
    next();
  }
}
