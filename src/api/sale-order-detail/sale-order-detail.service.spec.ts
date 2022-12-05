import { Test, TestingModule } from '@nestjs/testing';
import { SaleOrderDetailService } from './sale-order-detail.service';

describe('SaleOrderDetailService', () => {
  let service: SaleOrderDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleOrderDetailService],
    }).compile();

    service = module.get<SaleOrderDetailService>(SaleOrderDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
