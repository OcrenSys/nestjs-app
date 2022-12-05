import { Base } from '../../common/models/base.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Brand } from './brand.entity';
import { PurchaseOrderDetail } from './purchase-order-detail.entity';
import { SaleOrderDetail } from './sale-order-detail.entity';
import { ProductStock } from './product-stock.entity';
import * as NUMBER from '../../common/constants/number.contants';

@Entity()
export class Product extends Base {
  @Column({ nullable: false, length: NUMBER.N200 })
  description: string;

  @Column({ length: NUMBER.N12 })
  assin: string;

  @Column({
    length: NUMBER.N2000,
    nullable: true,
  })
  link: string;

  @Column() // Setting format, add 'lb' sufix
  weight: number;

  @Column({ length: NUMBER.N100 }) // Setting format 'LARGO x ALTO x ANCHO'
  dimensions: string;

  @Column()
  cost: number;

  @Column()
  storePrice: number;

  @Column()
  officePrice: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Brand, (brand) => brand.products, { nullable: true })
  brand?: Brand;

  @OneToOne(
    () => PurchaseOrderDetail,
    (purchaseOrderDetail) => purchaseOrderDetail.product,
    { nullable: true },
  )
  purchaseOrderDetail?: PurchaseOrderDetail;

  @OneToOne(
    () => SaleOrderDetail,
    (saleOrderDetail) => saleOrderDetail.product,
    { nullable: true },
  )
  saleOrderDetail?: SaleOrderDetail;

  @OneToOne(() => ProductStock, (productStock) => productStock.product, {
    nullable: true,
  })
  productStock?: ProductStock;
}
