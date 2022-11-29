import { Product } from '../../../api/product/entities/product.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Base } from '../../../common/models/base.entity';
import { SaleOrder } from '../../../api/sale-order/entities/sale-order.entity';

@Entity()
export class SaleOrderDetail extends Base {
  @Column()
  quantity: number;

  @Column()
  cost: number;

  @Column()
  price: number;

  @Column()
  exchangeRate: number;

  @ManyToOne(
    () => SaleOrderDetail,
    (SaleOrderDetail) => SaleOrderDetail.saleOrder,
    { nullable: true },
  )
  saleOrder: SaleOrder;

  @OneToOne(() => Product, (product) => product.saleOrderDetail, {
    nullable: true,
  })
  product: Product;
}
