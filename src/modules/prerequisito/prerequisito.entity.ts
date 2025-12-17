import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Disciplina } from '../disciplina/disciplina.entity';

@Entity()
export class PreRequisito {
  @PrimaryGeneratedColumn()
  id: number;

  // Disciplina que precisa do pré-requisito
  @ManyToOne(() => Disciplina, (d) => d.prerequisitos, { eager: true })
  disciplina: Disciplina;

  // Disciplina que é o pré-requisito
  @ManyToOne(() => Disciplina, { eager: true })
  disciplina_requisito: Disciplina;
}
