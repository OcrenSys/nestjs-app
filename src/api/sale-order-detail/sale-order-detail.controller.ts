import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SaleOrderDetailService } from './sale-order-detail.service';
import { CreateSaleOrderDetailDto } from './dto/create-sale-order-detail.dto';
import { UpdateSaleOrderDetailDto } from './dto/update-sale-order-detail.dto';

@Controller('sale-order-detail')
export class SaleOrderDetailController {
  constructor(
    private readonly saleOrderDetailService: SaleOrderDetailService,
  ) {}

  @Post()
  create(@Body() createSaleOrderDetailDto: CreateSaleOrderDetailDto) {
    return this.saleOrderDetailService.create(createSaleOrderDetailDto);
  }

  @Get()
  findAll() {
    return this.saleOrderDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleOrderDetailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSaleOrderDetailDto: UpdateSaleOrderDetailDto,
  ) {
    return this.saleOrderDetailService.update(+id, updateSaleOrderDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleOrderDetailService.remove(+id);
  }
}
