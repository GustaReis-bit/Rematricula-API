import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCursoDto {
  @ApiProperty({ example: 'Engenharia de Software' })
  @IsString()
  nome: string;

  @ApiProperty({ example: 'ES' })
  @IsString()
  sigla: string;
}
