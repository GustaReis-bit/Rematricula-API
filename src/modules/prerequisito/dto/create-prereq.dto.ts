import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreatePreReqDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  disciplinaId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  disciplinaRequisitoId: number;
}
