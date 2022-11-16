import { Injectable } from '@nestjs/common';
import { CreateSaleOrderDto } from './dto/create-sale-order.dto';
import { UpdateSaleOrderDto } from './dto/update-sale-order.dto';

@Injectable()
export class SaleOrderService {
  create(createSaleOrderDto: CreateSaleOrderDto) {
    return 'This action adds a new saleOrder';
  }

  findAll() {
    return `This action returns all saleOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saleOrder`;
  }

  update(id: number, updateSaleOrderDto: UpdateSaleOrderDto) {
    return `This action updates a #${id} saleOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleOrder`;
  }
}
