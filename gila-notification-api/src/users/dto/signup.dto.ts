import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}
