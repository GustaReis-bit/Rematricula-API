import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './modules/admin/admin.module';
import { AlunoModule } from './modules/aluno/aluno.module';
import { AuthModule } from './modules/auth/auth.module';
import { CursoModule } from './modules/curso/curso.module';
import { DisciplinaModule } from './modules/disciplina/disciplina.module';
import { TurmaModule } from './modules/turma/turma.module';
import { MatriculaModule } from './modules/matricula/matricula.module';
import { PreRequisitoModule } from './modules/prerequisito/prerequisito.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: { rejectUnauthorized: false }, // Necessário para Supabase
      }),
    }),

    AuthModule,
    AlunoModule,
    CursoModule,
    DisciplinaModule,
    TurmaModule,
    MatriculaModule,
    PreRequisitoModule,
    AdminModule,
  ],
})
export class AppModule {}
