import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Base } from '../../common/models/base.entity';
import { Product } from './product.entity';

@Entity()
export class ProductStock extends Base {
  @OneToOne(() => Product, (product) => product.productStock)
  @JoinColumn()
  product: Product;

  @Column({ default: 0 })
  stock: number;
}
