import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Aluno } from '../aluno/aluno.entity';
import { Turma } from '../turma/turma.entity';

@Entity()
export class MatriculaAluno {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aluno, (a) => a.matriculas, { eager: true })
  aluno: Aluno;

  @ManyToOne(() => Turma, (t) => t.matriculas, { eager: true })
  turma: Turma;

  @Column({ default: 'matriculado' })
  situacao: string;

  @CreateDateColumn()
  data_matricula: Date;
}
