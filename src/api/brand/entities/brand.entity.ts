import { Product } from '../../../api/product/entities/product.entity';
import { Column, OneToMany } from 'typeorm';
import { Base } from '../../../common/models/base.entity';

export class Brand extends Base {
  @Column({ length: 20 })
  description: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @Column({ default: true })
  isActive: boolean;
}
