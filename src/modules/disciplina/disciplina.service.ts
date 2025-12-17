import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disciplina } from './disciplina.entity';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { Curso } from '../curso/curso.entity';

@Injectable()
export class DisciplinaService {
  constructor(@InjectRepository(Disciplina) private repo: Repository<Disciplina>, @InjectRepository(Curso) private cursoRepo: Repository<Curso>) {}

  async create(dto: CreateDisciplinaDto) {
    const curso = await this.cursoRepo.findOneBy({ id: dto.cursoId });
    const d = this.repo.create({ codigo: dto.codigo, nome: dto.nome, carga_horaria: dto.carga_horaria, curso });
    return this.repo.save(d);
  }
  findAll() { return this.repo.find(); }
  findOne(id: number) { return this.repo.findOneBy({ id }); }
  remove(id: number) { return this.repo.delete(id); }
}
