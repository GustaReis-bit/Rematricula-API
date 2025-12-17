import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreRequisito } from './prerequisito.entity';
import { Disciplina } from '../disciplina/disciplina.entity';
import { PreRequisitoService } from './prerequisito.service';
import { PreRequisitoController } from './prerequisito.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PreRequisito, Disciplina])],
  providers: [PreRequisitoService],
  controllers: [PreRequisitoController],
})
export class PreRequisitoModule {}
