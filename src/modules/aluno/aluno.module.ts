import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './aluno.entity';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { Curso } from '../curso/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno, Curso])],
  providers: [AlunoService],
  controllers: [AlunoController],
  exports: [AlunoService],
})
export class AlunoModule {}
