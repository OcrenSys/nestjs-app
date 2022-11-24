import { Module } from '@nestjs/common';
import { AdvertisingSourceService } from './advertising-source.service';
import { AdvertisingSourceController } from './advertising-source.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisingSource } from './entities/advertising-source.entity';

@Module({
  controllers: [AdvertisingSourceController],
  providers: [AdvertisingSourceService],
  imports: [TypeOrmModule.forFeature([AdvertisingSource])],
})
export class AdvertisingSourceModule {}
