import { SaleOrderDetail } from '../../../api/sale-order-detail/entities/sale-order-detail.entity';
import { Column, OneToMany } from 'typeorm';
import { Base } from '../../../common/models/base.entity';

export class SaleOrder extends Base {
  @Column()
  transactionDate: string;

  @Column()
  exchangeRate: number;

  @OneToMany(
    () => SaleOrderDetail,
    (saleOrderDetail) => saleOrderDetail.saleOrder,
    { nullable: true },
  )
  saleOrderDetail: SaleOrderDetail[];
}
