import { Module } from '@nestjs/common';
import { ProductStockService } from './product-stock.service';
import { ProductStockController } from './product-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductStock } from '../../database/models/product-stock.entity';

@Module({
  controllers: [ProductStockController],
  providers: [ProductStockService],
  imports: [TypeOrmModule.forFeature([ProductStock])],
})
export class ProductStockModule {}
