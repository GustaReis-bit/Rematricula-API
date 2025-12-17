import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreRequisito } from './prerequisito.entity';
import { Disciplina } from '../disciplina/disciplina.entity';

@Injectable()
export class PreRequisitoService {
  constructor(
    @InjectRepository(PreRequisito)
    private repo: Repository<PreRequisito>,

    @InjectRepository(Disciplina)
    private discRepo: Repository<Disciplina>,
  ) {}

  async create(disciplinaId: number, disciplinaRequisitoId: number) {
    console.log('disciplinaId:', disciplinaId);
    console.log('disciplinaRequisitoId:', disciplinaRequisitoId);

    if (disciplinaId === disciplinaRequisitoId) {
      throw new BadRequestException('Uma disciplina não pode ser pré-requisito dela mesma');
    }

    const disciplina = await this.discRepo.findOne({ where: { id: disciplinaId } });
    const requisito = await this.discRepo.findOne({ where: { id: disciplinaRequisitoId } });

    if (!disciplina || !requisito) {
      throw new NotFoundException('Disciplina(s) não encontrada(s)');
    }

    const prereq = this.repo.create({
      disciplina,
      disciplina_requisito: requisito,
    });

    return this.repo.save(prereq);
  }

  findAll() {
    return this.repo.find();
  }

  async delete(id: number) {
    const prereq = await this.repo.findOne({ where: { id } });

    if (!prereq) {
      throw new NotFoundException('Pré-requisito não encontrado');
    }

    await this.repo.delete(id);

    return { message: 'Pré-requisito removido com sucesso' };
  }
}
