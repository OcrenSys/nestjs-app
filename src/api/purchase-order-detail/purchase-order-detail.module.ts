import { Module } from '@nestjs/common';
import { PurchaseOrderDetailService } from './purchase-order-detail.service';
import { PurchaseOrderDetailController } from './purchase-order-detail.controller';
import { PurchaseOrderDetail } from '../../database/models/purchase-order-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PurchaseOrderDetailController],
  providers: [PurchaseOrderDetailService],
  imports: [TypeOrmModule.forFeature([PurchaseOrderDetail])],
})
export class PurchaseOrderDetailModule {}
