import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductStockService } from './product-stock.service';
import { CreateProductStockDto } from './dto/create-product-stock.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';

@Controller('product-stock')
export class ProductStockController {
  constructor(private readonly productStockService: ProductStockService) {}

  @Post()
  create(@Body() createProductStockDto: CreateProductStockDto) {
    return this.productStockService.create(createProductStockDto);
  }

  @Get()
  findAll() {
    return this.productStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productStockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductStockDto: UpdateProductStockDto) {
    return this.productStockService.update(+id, updateProductStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productStockService.remove(+id);
  }
}
