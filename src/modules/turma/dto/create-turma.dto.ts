import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTurmaDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  disciplinaId!: number;

  @ApiProperty({ example: 'Prof. João' })
  @IsString()
  professor!: string;

  @ApiProperty({ example: 'Seg 08:00-10:00' })
  @IsString()
  horario!: string;

  @ApiProperty({ example: '2025.1' })
  @IsString()
  periodo_letivo!: string;
}
