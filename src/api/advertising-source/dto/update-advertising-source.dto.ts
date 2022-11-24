import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNumber } from 'class-validator';
import { CreateAdvertisingSourceDto } from './create-advertising-source.dto';

export class UpdateAdvertisingSourceDto extends PartialType(
  CreateAdvertisingSourceDto,
) {
  @IsNumber()
  id: number;

  @IsDate()
  updatedAt: string;
}
