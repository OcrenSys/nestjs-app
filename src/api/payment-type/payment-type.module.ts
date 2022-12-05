import { Module } from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
import { PaymentTypeController } from './payment-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentType } from '../../database/models/payment-type.entity';

@Module({
  controllers: [PaymentTypeController],
  providers: [PaymentTypeService],
  imports: [TypeOrmModule.forFeature([PaymentType])],
})
export class PaymentTypeModule {}
