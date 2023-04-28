import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class CreateAssociationDto {
  @ApiProperty({ example: 'AoT' })
  @IsNotEmpty()
  @Validate(IsNotExist, ['Association', 'shortTitle'], {
    message: 'AssociationShortcutExists',
  })
  @MinLength(2)
  @MaxLength(20)
  shortTitle: string;

  @ApiProperty({ example: 'Association of truth' })
  @MinLength(2)
  title?: string;

  @ApiProperty({ example: 'This is some description about the association' })
  description: string | null;
}
