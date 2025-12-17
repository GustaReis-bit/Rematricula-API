import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';

@Injectable()
export class CursoService {
  constructor(@InjectRepository(Curso) private repo: Repository<Curso>) {}

  create(dto: CreateCursoDto) {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  findAll() { return this.repo.find(); }
  findOne(id: number) { return this.repo.findOneBy({ id }); }
  async update(id: number, dto: Partial<CreateCursoDto>) { await this.repo.update(id, dto); return this.findOne(id); }
  remove(id: number) { return this.repo.delete(id); }
}
