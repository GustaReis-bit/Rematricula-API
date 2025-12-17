import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MatriculaAluno } from './matricula.entity';
import { MatriculaService } from './matricula.service';
import { MatriculaController } from './matricula.controller';

import { Aluno } from '../aluno/aluno.entity';
import { Turma } from '../turma/turma.entity';
import { Disciplina } from '../disciplina/disciplina.entity';

import { DisciplinaModule } from '../disciplina/disciplina.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MatriculaAluno,
      Aluno,
      Turma,
      Disciplina,
    ]),
    DisciplinaModule,
  ],
  controllers: [MatriculaController],
  providers: [MatriculaService],
  exports: [MatriculaService],
})
export class MatriculaModule {}
