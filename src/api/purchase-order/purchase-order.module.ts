import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrderController } from './purchase-order.controller';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService],
  imports: [TypeOrmModule.forFeature([PurchaseOrder])],
})
export class PurchaseOrderModule {}
