import { Module } from '@nestjs/common';
import { SaleOrderService } from './sale-order.service';
import { SaleOrderController } from './sale-order.controller';

@Module({
  controllers: [SaleOrderController],
  providers: [SaleOrderService]
})
export class SaleOrderModule {}
