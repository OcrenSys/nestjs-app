import { Test, TestingModule } from '@nestjs/testing';
import { SaleOrderDetailController } from './sale-order-detail.controller';
import { SaleOrderDetailService } from './sale-order-detail.service';

describe('SaleOrderDetailController', () => {
  let controller: SaleOrderDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleOrderDetailController],
      providers: [SaleOrderDetailService],
    }).compile();

    controller = module.get<SaleOrderDetailController>(SaleOrderDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
