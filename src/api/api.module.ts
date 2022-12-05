import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../common/guards/auth/auth.guard';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AdvertisingSourceModule } from './advertising-source/advertising-source.module';
import { BrandModule } from './brand/brand.module';
import { CustomerModule } from './customer/customer.module';
import { DeliveryTypeModule } from './delivery-type/delivery-type.module';
import { PaymentTypeModule } from './payment-type/payment-type.module';
import { ProductModule } from './product/product.module';
import { PurchaseOrderDetailModule } from './purchase-order-detail/purchase-order-detail.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { RoleModule } from './role/role.module';
import { SaleOrderDetailModule } from './sale-order-detail/sale-order-detail.module';
import { SaleOrderModule } from './sale-order/sale-order.module';
import { ProductStockModule } from './product-stock/product-stock.module';
import { LoggerModule } from './logger/logger.module';

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
    ProductStockModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class ApiModule {}
