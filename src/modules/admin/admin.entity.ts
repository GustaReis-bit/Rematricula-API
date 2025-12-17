import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('admin')
export class Admin {
  @PrimaryColumn()
  id: string; // ID do usuário criado no Supabase Auth

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string; // senha hash no banco
}
