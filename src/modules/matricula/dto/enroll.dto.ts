import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EnrollDto {
  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  turmaId!: number;
}
