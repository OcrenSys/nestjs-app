import { Module } from '@nestjs/common';
import { DeliveryTypeService } from './delivery-type.service';
import { DeliveryTypeController } from './delivery-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryType } from '../../database/models/delivery-type.entity';

@Module({
  controllers: [DeliveryTypeController],
  providers: [DeliveryTypeService],
  imports: [TypeOrmModule.forFeature([DeliveryType])],
})
export class DeliveryTypeModule {}
