import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Aluno } from './aluno.entity';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Curso } from '../curso/curso.entity';

@Injectable()
export class AlunoService {
  constructor(@InjectRepository(Aluno) private repo: Repository<Aluno>, @InjectRepository(Curso) private cursoRepo: Repository<Curso>) {}

  async create(dto: CreateAlunoDto) {
    const aluno = this.repo.create({ nome: dto.nome, matricula: dto.matricula, email: dto.email, senha: await bcrypt.hash(dto.senha, 10) });
    if (dto.cursoId) {
      const curso = await this.cursoRepo.findOneBy({ id: dto.cursoId });
      if (curso) aluno.curso = curso;
    }
    return this.repo.save(aluno);
  }

  findAll() { return this.repo.find(); }
  findOneByEmail(email: string) { return this.repo.findOne({ where: { email } }); }
  findOne(id: number) { return this.repo.findOneBy({ id }); }
  remove(id: number) { return this.repo.delete(id); }
}
