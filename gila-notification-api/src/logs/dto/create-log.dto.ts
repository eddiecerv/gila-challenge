import { ApiProperty } from '@nestjs/swagger';

export class CreateLogDto {
  @ApiProperty()
  notification: string;

  @ApiProperty()
  user: string;

  @ApiProperty()
  notificationType: string;
}
