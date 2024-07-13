import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  message: string;
}
