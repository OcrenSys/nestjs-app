import { Module } from '@nestjs/common';
import { SaleOrderService } from './sale-order.service';
import { SaleOrderController } from './sale-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleOrder } from './entities/sale-order.entity';

@Module({
  controllers: [SaleOrderController],
  providers: [SaleOrderService],
  imports: [TypeOrmModule.forFeature([SaleOrder])],
})
export class SaleOrderModule {}
