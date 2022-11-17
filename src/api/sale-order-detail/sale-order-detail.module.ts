import { Module } from '@nestjs/common';
import { SaleOrderDetailService } from './sale-order-detail.service';
import { SaleOrderDetailController } from './sale-order-detail.controller';

@Module({
  controllers: [SaleOrderDetailController],
  providers: [SaleOrderDetailService],
})
export class SaleOrderDetailModule {}
