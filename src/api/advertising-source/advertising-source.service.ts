import { Injectable } from '@nestjs/common';
import { CreateAdvertisingSourceDto } from './dto/create-advertising-source.dto';
import { UpdateAdvertisingSourceDto } from './dto/update-advertising-source.dto';

@Injectable()
export class AdvertisingSourceService {
  create(createAdvertisingSourceDto: CreateAdvertisingSourceDto) {
    return 'This action adds a new advertisingSource';
  }

  findAll() {
    return `This action returns all advertisingSource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} advertisingSource`;
  }

  update(id: number, updateAdvertisingSourceDto: UpdateAdvertisingSourceDto) {
    return `This action updates a #${id} advertisingSource`;
  }

  remove(id: number) {
    return `This action removes a #${id} advertisingSource`;
  }
}
