import { Test, TestingModule } from '@nestjs/testing';
import { AdvertisingSourceController } from './advertising-source.controller';
import { AdvertisingSourceService } from './advertising-source.service';

describe('AdvertisingSourceController', () => {
  let controller: AdvertisingSourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvertisingSourceController],
      providers: [AdvertisingSourceService],
    }).compile();

    controller = module.get<AdvertisingSourceController>(AdvertisingSourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
