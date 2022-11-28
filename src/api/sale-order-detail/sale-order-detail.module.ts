import { Module } from '@nestjs/common';
import { SaleOrderDetailService } from './sale-order-detail.service';
import { SaleOrderDetailController } from './sale-order-detail.controller';
import { SaleOrderDetail } from './entities/sale-order-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SaleOrderDetailController],
  providers: [SaleOrderDetailService],
  imports: [TypeOrmModule.forFeature([SaleOrderDetail])],
})
export class SaleOrderDetailModule {}
