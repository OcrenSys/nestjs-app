import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrderController } from './purchase-order.controller';
import { PurchaseOrder } from '../../database/models/purchase-order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderDetail } from '../../database/models/purchase-order-detail.entity';

@Module({
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService],
  imports: [TypeOrmModule.forFeature([PurchaseOrder, PurchaseOrderDetail])],
})
export class PurchaseOrderModule {}
