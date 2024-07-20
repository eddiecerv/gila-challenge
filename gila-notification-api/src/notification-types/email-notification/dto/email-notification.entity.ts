import { ApiProperty } from '@nestjs/swagger';

export class EmailNotificationEntity {
  @ApiProperty()
  email: string;

  @ApiProperty()
  message: string;
}
