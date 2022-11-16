import { Test, TestingModule } from '@nestjs/testing';
import { SaleOrderController } from './sale-order.controller';
import { SaleOrderService } from './sale-order.service';

describe('SaleOrderController', () => {
  let controller: SaleOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleOrderController],
      providers: [SaleOrderService],
    }).compile();

    controller = module.get<SaleOrderController>(SaleOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
