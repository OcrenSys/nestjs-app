import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleOrderDetailDto } from './create-sale-order-detail.dto';

export class UpdateSaleOrderDetailDto extends PartialType(CreateSaleOrderDetailDto) {}
