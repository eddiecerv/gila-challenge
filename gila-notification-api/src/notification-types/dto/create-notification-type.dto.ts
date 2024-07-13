import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationTypeDto {
  @ApiProperty()
  tag: string;

  @ApiProperty()
  name: string;
}
