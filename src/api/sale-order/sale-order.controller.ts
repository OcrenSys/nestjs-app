import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaleOrderService } from './sale-order.service';
import { CreateSaleOrderDto } from './dto/create-sale-order.dto';
import { UpdateSaleOrderDto } from './dto/update-sale-order.dto';

@Controller('sale-order')
export class SaleOrderController {
  constructor(private readonly saleOrderService: SaleOrderService) {}

  @Post()
  create(@Body() createSaleOrderDto: CreateSaleOrderDto) {
    return this.saleOrderService.create(createSaleOrderDto);
  }

  @Get()
  findAll() {
    return this.saleOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleOrderDto: UpdateSaleOrderDto) {
    return this.saleOrderService.update(+id, updateSaleOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleOrderService.remove(+id);
  }
}
