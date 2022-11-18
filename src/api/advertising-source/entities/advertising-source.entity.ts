import { Column } from 'typeorm';
import { Base } from '../../../common/models/base.entity';

export class AdvertisingSource extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  other: string;

  // this is a test commend to check auto reload changes
}
