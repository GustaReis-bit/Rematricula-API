import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { SupabaseService } from '../../supabase/supabase.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private supabase: SupabaseService,
  ) {}

  // -----------------------
  // REGISTRO
  // -----------------------
  async register(dto: CreateAdminDto) {
    // 1. Criar usuário no Supabase Auth
    const { data, error } = await this.supabase.client.auth.admin.createUser({
      email: dto.email,
      password: dto.senha,
    });

    if (error) throw error;

    const userId = data.user.id;

    // 2. Salvar no banco com senha hash
    const hashed = await bcrypt.hash(dto.senha, 10);

    const admin = this.adminRepository.create({
      id: userId,
      nome: dto.nome,
      email: dto.email,
      senha: hashed,
    });

    await this.adminRepository.save(admin);

    return { message: 'Administrador criado com sucesso', id: userId };
  }

  // -----------------------
  // LOGIN
  // -----------------------
  async login(email: string, senha: string) {

    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) throw new UnauthorizedException('Email ou senha inválidos');

    const valid = await bcrypt.compare(senha, admin.senha);
    if (!valid) throw new UnauthorizedException('Email ou senha inválidos');

    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) throw new UnauthorizedException(error.message);

    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    };
  }

  // -----------------------
  // /me (dados do admin logado)
  // -----------------------
  async getMe(userId: string) {
    return await this.adminRepository.findOne({ where: { id: userId } });
  }
}
