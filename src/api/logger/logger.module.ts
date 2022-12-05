import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { Logger } from '../../database/models/logger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [LoggerController],
  providers: [LoggerService],
  exports: [LoggerService],
  imports: [TypeOrmModule.forFeature([Logger])],
})
export class LoggerModule {}
