import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class CreateJoinReqDto {
  @ApiProperty({ example: 'Association of truth' })
  @MinLength(2)
  description?: string;
}
