import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Curso } from '../curso/curso.entity';
import { MatriculaAluno } from '../matricula/matricula.entity';

@Entity()
export class Aluno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  matricula: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  senha?: string;

  @ManyToOne(() => Curso, (curso) => curso.disciplinas, { nullable: true })
  curso?: Curso;

  @OneToMany(() => MatriculaAluno, (m) => m.aluno)
  matriculas: MatriculaAluno[];
}
