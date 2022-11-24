import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/models/base.entity';
import * as NUMBER from '../../../common/constants/number.contants';

@Entity()
export class AdvertisingSource extends Base {
  @Column({ length: NUMBER.N100, nullable: false })
  name: string;

  @Column({ default: true })
  isActive: boolean;
}
