import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdvertisingSourceService } from './advertising-source.service';
import { CreateAdvertisingSourceDto } from './dto/create-advertising-source.dto';
import { UpdateAdvertisingSourceDto } from './dto/update-advertising-source.dto';

@Controller('advertising-source')
export class AdvertisingSourceController {
  constructor(
    private readonly advertisingSourceService: AdvertisingSourceService,
  ) {}

  @Post()
  create(@Body() createAdvertisingSourceDto: CreateAdvertisingSourceDto) {
    return this.advertisingSourceService.create(createAdvertisingSourceDto);
  }

  @Get()
  findAll() {
    return this.advertisingSourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertisingSourceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdvertisingSourceDto: UpdateAdvertisingSourceDto,
  ) {
    return this.advertisingSourceService.update(
      +id,
      updateAdvertisingSourceDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advertisingSourceService.remove(+id);
  }
}
