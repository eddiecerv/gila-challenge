import { Test, TestingModule } from '@nestjs/testing';
import { SmsNotificationController } from './sms-notification.controller';

describe('SmsNotificationController', () => {
  let controller: SmsNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmsNotificationController],
    }).compile();

    controller = module.get<SmsNotificationController>(SmsNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
