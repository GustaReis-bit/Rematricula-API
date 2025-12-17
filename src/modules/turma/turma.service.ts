import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turma } from './turma.entity';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { Disciplina } from '../disciplina/disciplina.entity';

@Injectable()
export class TurmaService {
  constructor(@InjectRepository(Turma) private repo: Repository<Turma>, @InjectRepository(Disciplina) private disciplinaRepo: Repository<Disciplina>) {}

  async create(dto: CreateTurmaDto) {
    console.log("iddisplina=",dto.disciplinaId);
    const disciplina = await this.disciplinaRepo.findOneBy({ id: dto.disciplinaId });
    if (!disciplina) throw new NotFoundException('Disciplina não encontrada');
    const t = this.repo.create({ disciplina, professor: dto.professor, horario: dto.horario, periodo_letivo: dto.periodo_letivo });
    return this.repo.save(t);
  }
  findAll() { return this.repo.find(); }
  findByPeriodo(periodo: string) { return this.repo.find({ where: { periodo_letivo: periodo } }); }
  findOne(id: number) { return this.repo.findOneBy({ id }); }
  remove(id: number) { return this.repo.delete(id); }
}
