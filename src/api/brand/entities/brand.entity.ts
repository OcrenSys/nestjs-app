import { Product } from '../../../api/product/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../../common/models/base.entity';
@Entity()
export class Brand extends Base {
  @Column({ length: 20 })
  description: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @Column({ default: true })
  isActive: boolean;
}
