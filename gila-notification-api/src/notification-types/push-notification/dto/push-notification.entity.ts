import { ApiProperty } from '@nestjs/swagger';

export class PushNotificationEntity {
  @ApiProperty()
  deviceId: string;

  @ApiProperty()
  message: string;
}
