import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Disciplina } from '../disciplina/disciplina.entity';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sigla: string;

  @OneToMany(() => Disciplina, (d) => d.curso)
  disciplinas: Disciplina[];
}
