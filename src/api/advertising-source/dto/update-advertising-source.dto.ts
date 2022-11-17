import { PartialType } from '@nestjs/mapped-types';
import { CreateAdvertisingSourceDto } from './create-advertising-source.dto';

export class UpdateAdvertisingSourceDto extends PartialType(
  CreateAdvertisingSourceDto,
) {}
