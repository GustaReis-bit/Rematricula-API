import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MatriculaAluno } from './matricula.entity';
import { Aluno } from '../aluno/aluno.entity';
import { Turma } from '../turma/turma.entity';
import { Disciplina } from '../disciplina/disciplina.entity';

@Injectable()
export class MatriculaService {
  constructor(
    @InjectRepository(MatriculaAluno) private repo: Repository<MatriculaAluno>,
    @InjectRepository(Aluno) private alunoRepo: Repository<Aluno>,
    @InjectRepository(Turma) private turmaRepo: Repository<Turma>,
    @InjectRepository(Disciplina) private disciplinaRepo: Repository<Disciplina>,
  ) {}

  async enroll(alunoId: number, turmaId: number) {
    const aluno = await this.alunoRepo.findOneBy({ id: alunoId });

    const turma = await this.turmaRepo.findOne({
      where: { id: turmaId },
      relations: ['disciplina', 'disciplina.prerequisitos'],
    });

    if (!aluno) throw new NotFoundException('Aluno não encontrado');
    if (!turma) throw new NotFoundException('Turma não encontrada');

    const disciplina = turma.disciplina;
    if (!disciplina)
      throw new BadRequestException('Turma não possui disciplina vinculada');

    const prerequisitos = disciplina.prerequisitos || [];

    if (prerequisitos.length > 0) {
      const matriculasAluno = await this.repo.find({
        where: { aluno: { id: alunoId } },
        relations: ['turma', 'turma.disciplina'],
      });

      const disciplinasAprovadasIds = matriculasAluno
        .filter((m) => m.situacao === 'aprovado')
        .map((m) => m.turma.disciplina.id);

      const naoCumpridos = prerequisitos.filter(
        (p) => !disciplinasAprovadasIds.includes(p.id),
      );

      if (naoCumpridos.length > 0) {
        const nomes = naoCumpridos.map((p) => p.nome).join(', ');
        throw new BadRequestException(
          `Não é possível cursar "${disciplina.nome}". Pré-requisitos pendentes: ${nomes}`,
        );
      }
    }

    

    return this.repo.save(Object.assign(new MatriculaAluno(),{
      aluno,
      turma,
      situacao: 'matriculado',
    }));
  }

  findByAluno(alunoId: number) {
    return this.repo.find({
      where: { aluno: { id: alunoId } },
      relations: ['turma', 'turma.disciplina'],
    });
  }

  async deleteMatricula(id: string, alunoId: number) {
    const matricula = await this.repo.findOne({
      where: { id: Number(id) },
      relations: ['aluno'],
    });

    if (!matricula) throw new NotFoundException('Matrícula não encontrada');

    if (matricula.aluno.id !== alunoId)
      throw new ForbiddenException('Você não pode remover matrícula de outro aluno');

    await this.repo.remove(matricula);

    return { message: 'Matrícula removida com sucesso' };
  }
}
