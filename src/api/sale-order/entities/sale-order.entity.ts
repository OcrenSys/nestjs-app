import { Column } from 'typeorm';
import { Base } from '../../../common/models/base.entity';

export class SaleOrder extends Base {
  @Column()
  transactionDate: string;

  @Column()
  exchangeRate: number;
}
