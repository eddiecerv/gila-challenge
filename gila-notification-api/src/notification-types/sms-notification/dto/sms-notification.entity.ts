import { ApiProperty } from '@nestjs/swagger';

export class SmsNotificationEntity {
  @ApiProperty()
  phone: string;

  @ApiProperty()
  message: string;
}
