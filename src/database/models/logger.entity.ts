import { MaxLength } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../common/models/base.entity';
import { Authentication } from './authentication.entity';
import * as NUMBER from '../../common/constants/number.contants';

@Entity()
export class Logger extends Base {
  @Column({ default: '' })
  massage: string;

  @Column({ default: '', length: NUMBER.N1000 })
  @MaxLength(NUMBER.N1000, {
    message: `The Logger's headers must contain at least ${NUMBER.N1000}`,
  })
  headers: string;

  @Column({ default: '', length: NUMBER.N1000 })
  @MaxLength(NUMBER.N1000, {
    message: `The Logger's body must contain at least ${NUMBER.N1000}`,
  })
  body: string;

  @Column({ default: '', length: NUMBER.N1000 })
  @MaxLength(NUMBER.N1000, {
    message: `The Logger's url must contain at least ${NUMBER.N1000}`,
  })
  url: string;

  @ManyToOne(() => Authentication, (authentication) => authentication.logger, {
    nullable: true,
  })
  user: Authentication;
}
