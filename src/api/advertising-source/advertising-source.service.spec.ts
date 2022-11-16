import { Test, TestingModule } from '@nestjs/testing';
import { AdvertisingSourceService } from './advertising-source.service';

describe('AdvertisingSourceService', () => {
  let service: AdvertisingSourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvertisingSourceService],
    }).compile();

    service = module.get<AdvertisingSourceService>(AdvertisingSourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
