import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from '../aluno/aluno.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, @InjectRepository(Aluno) private repo: Repository<Aluno>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET') || 'supersecret_jwt_key',
    });
  }

  async validate(payload: any) {
    const user = await this.repo.findOneBy({ id: payload.sub });
    if (user) {
      const { senha, ...rest } = user as any;
      return rest;
    }
    return null;
  }
}
