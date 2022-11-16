import { Injectable } from '@nestjs/common';
import { CreateSaleOrderDetailDto } from './dto/create-sale-order-detail.dto';
import { UpdateSaleOrderDetailDto } from './dto/update-sale-order-detail.dto';

@Injectable()
export class SaleOrderDetailService {
  create(createSaleOrderDetailDto: CreateSaleOrderDetailDto) {
    return 'This action adds a new saleOrderDetail';
  }

  findAll() {
    return `This action returns all saleOrderDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saleOrderDetail`;
  }

  update(id: number, updateSaleOrderDetailDto: UpdateSaleOrderDetailDto) {
    return `This action updates a #${id} saleOrderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleOrderDetail`;
  }
}
