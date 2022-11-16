import { Module } from '@nestjs/common';
import { AdvertisingSourceService } from './advertising-source.service';
import { AdvertisingSourceController } from './advertising-source.controller';

@Module({
  controllers: [AdvertisingSourceController],
  providers: [AdvertisingSourceService]
})
export class AdvertisingSourceModule {}
