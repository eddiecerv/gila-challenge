import { Test, TestingModule } from '@nestjs/testing';
import { NotificationTypesController } from './notification-types.controller';

describe('NotificationTypesController', () => {
  let controller: NotificationTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationTypesController],
    }).compile();

    controller = module.get<NotificationTypesController>(NotificationTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
