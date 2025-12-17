import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from '../aluno/aluno.entity';
import {match} from "node:assert";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(Aluno) private alunoRepo: Repository<Aluno>,
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.alunoRepo.findOne({ where: { email } });

        if (!user) return null;

        if (user.senha != null) {
            const match = await bcrypt.compare(pass, user.senha);
        }

        if (!match) return null;

        const { senha, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = {
            sub: user.id,
            email: user.email,
            nome: user.nome,
            role: user.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
}