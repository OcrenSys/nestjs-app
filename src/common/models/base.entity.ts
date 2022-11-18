import { IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn()
  @Column()
  @IsNumber()
  id: number;

  @Column()
  @CreateDateColumn()
  createAt: Date;

  @Column()
  @UpdateDateColumn()
  updateAt: Date;

  @Column()
  @DeleteDateColumn()
  removeAt: Date;
}
