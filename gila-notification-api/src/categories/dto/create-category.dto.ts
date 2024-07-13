import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  tag: string;

  @ApiProperty()
  name: string;
}
