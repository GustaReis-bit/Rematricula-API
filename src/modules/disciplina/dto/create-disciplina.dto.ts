import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDisciplinaDto {
  @ApiProperty({ example: 'MAT101' })
  @IsString()
  codigo: string;

  @ApiProperty({ example: 'Matemática' })
  @IsString()
  nome: string;

  @ApiProperty({ example: 60 })
  @IsInt()
  carga_horaria: number;

  @ApiProperty({ example: 1 })
  cursoId: number;
}
