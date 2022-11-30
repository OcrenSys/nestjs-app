import { IsNumber, IsObject } from 'class-validator';
import { Product } from 'src/database/models/product.entity';

export class CreateProductStockDto {
  @IsNumber()
  stock: number;

  @IsObject()
  product: Product;
}
