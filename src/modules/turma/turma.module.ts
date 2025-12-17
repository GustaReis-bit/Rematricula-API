import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turma } from './turma.entity';
import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';
import { Disciplina } from '../disciplina/disciplina.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Turma, Disciplina])],
  providers: [TurmaService],
  controllers: [TurmaController],
  exports: [TurmaService],
})
export class TurmaModule {}
