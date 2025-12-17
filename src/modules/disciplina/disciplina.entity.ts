import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Curso } from '../curso/curso.entity';
import { PreRequisito } from '../prerequisito/prerequisito.entity';
import { Turma } from '../turma/turma.entity';

@Entity()
export class Disciplina {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codigo: string;

  @Column()
  nome: string;

  @Column()
  carga_horaria: number;

  @ManyToOne(() => Curso, (c) => c.disciplinas)
  curso: Curso;

  // Lista de pré-requisitos necessários para cursar esta disciplina
  @OneToMany(() => PreRequisito, (p) => p.disciplina)
  prerequisitos: PreRequisito[];


  @OneToMany(() => Turma, (t) => t.disciplina)
  turmas: Turma[];
}
