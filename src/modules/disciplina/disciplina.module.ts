import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disciplina } from './disciplina.entity';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaController } from './disciplina.controller';
import { Curso } from '../curso/curso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Disciplina, Curso]), // cria os repositórios
  ],
  providers: [DisciplinaService],
  controllers: [DisciplinaController],
  
  // O mais importante: exportar os REPOSITÓRIOS (TypeOrmModule)
  exports: [
    TypeOrmModule,
    DisciplinaService,
  ],
})
export class DisciplinaModule {}
