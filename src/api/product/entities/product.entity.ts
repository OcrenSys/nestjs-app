import { Base } from '../../../common/models/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Brand } from '../../../api/brand/entities/brand.entity';
@Entity()
export class Product extends Base {
  @Column({ nullable: false, length: 100 })
  description: string;

  @Column({ length: 12 })
  assin: string;

  @Column({
    length: 2000,
    nullable: true,
    transformer: {
      from(value: string | null): URL | string | null {
        return value !== null ? new URL(value) : value;
      },
      to(value: URL | string | null): string | null {
        return value?.toString() || null;
      },
    },
  })
  link: URL | string | null;

  @Column() // Setting format, add 'lb' sufix
  waight: number;

  @Column() // Setting format 'LARGO x ALTO x ANCHO'
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
  brand: Brand;
}
