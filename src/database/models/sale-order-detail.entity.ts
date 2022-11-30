import { Product } from './product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Base } from '../../common/models/base.entity';
import { SaleOrder } from './sale-order.entity';

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
  @JoinColumn()
  product: Product;
}
