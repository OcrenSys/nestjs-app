import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './api/product/product.module';
import { CustomerModule } from './api/customer/customer.module';
import { BrandModule } from './api/brand/brand.module';
import { DeliveryTypeModule } from './api/delivery-type/delivery-type.module';
import { AdvertisingSourceModule } from './api/advertising-source/advertising-source.module';
import { PaymentTypeModule } from './api/payment-type/payment-type.module';
import { SaleOrderModule } from './api/sale-order/sale-order.module';
import { SaleOrderDetailModule } from './api/sale-order-detail/sale-order-detail.module';
import { PurchaseOrderDetailModule } from './api/purchase-order-detail/purchase-order-detail.module';
import { PurchaseOrderModule } from './api/purchase-order/purchase-order.module';
import { RoleModule } from './api/role/role.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ProductModule,
    CustomerModule,
    BrandModule,
    DeliveryTypeModule,
    AdvertisingSourceModule,
    PaymentTypeModule,
    SaleOrderModule,
    SaleOrderDetailModule,
    PurchaseOrderDetailModule,
    PurchaseOrderModule,
    RoleModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
