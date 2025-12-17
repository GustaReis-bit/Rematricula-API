# Rematrícula API

API de rematrícula desenvolvida em NestJS com TypeORM e Supabase (Postgres). Fornece endpoints para gerenciamento de alunos, cursos, disciplinas, turmas, pré-requisitos, matrícula e autenticação (JWT + Google OAuth2).

---

## Tecnologias

- Node.js + TypeScript
- NestJS
- TypeORM
- Supabase (Postgres)
- JWT, Passport, Google OAuth2
- Swagger (documentação, se configurada)

---

## Estrutura do projeto

```
package.json
tsconfig.json
src/
  app.module.ts
  main.ts
  common/
    jwt-auth.guard.ts
    decorators/
      roles.decorator.ts
    guards/
      roles.guard.ts
  modules/
    admin/
      admin.controller.ts
      admin.entity.ts
      admin.module.ts
      admin.service.ts
      dto/
        create-admin.dto.ts
    aluno/
      aluno.controller.ts
      aluno.entity.ts
      aluno.module.ts
      aluno.service.ts
      index.ts
      dto/
        create-aluno.dto.ts
    auth/
      admin.guard.ts
      auth.controller.ts
      auth.module.ts
      auth.service.ts
      index.ts
      jwt.strategy.ts
    curso/
      curso.controller.ts
      curso.entity.ts
      curso.module.ts
      curso.service.ts
      index.ts
      dto/
        create-curso.dto.ts
    disciplina/
      disciplina.controller.ts
      disciplina.entity.ts
      disciplina.module.ts
      disciplina.service.ts
      index.ts
      dto/
        create-disciplina.dto.ts
    matricula/
      index.ts
      matricula.controller.ts
      matricula.entity.ts
      matricula.module.ts
      matricula.service.ts
      dto/
        enroll.dto.ts
    prerequisito/
      index.ts
      prerequisito.controller.ts
      prerequisito.entity.ts
      prerequisito.module.ts
      prerequisito.service.ts
      dto/
        create-prereq.dto.ts
    turma/
      index.ts
      turma.controller.ts
      turma.entity.ts
      turma.module.ts
      turma.service.ts
      dto/
        create-turma.dto.ts
  supabase/
    supabase.module.ts
    supabase.service.ts

```

---

## Variáveis de ambiente (exemplo)

- `DATABASE_URL` - URL de conexão Postgres (usado pelo TypeORM / Supabase)
- `SUPABASE_URL` - URL do projeto Supabase
- `SUPABASE_KEY` - Service key / anon key do Supabase
- `JWT_SECRET` - Chave secreta para assinatura de tokens JWT
- `GOOGLE_CLIENT_ID` - Client ID para Google OAuth2
- `GOOGLE_CLIENT_SECRET` - Client Secret para Google OAuth2
- `PORT` - Porta onde a API roda (opcional)

Crie um arquivo `.env` com essas variáveis antes de iniciar.

---

## Scripts úteis

Use os scripts definidos em `package.json`:

```bash
npm install
npm run dev    # inicia em modo desenvolvimento (ts-node-dev)
npm run start  # inicia com ts-node
npm run build  # compila TypeScript (tsc)
```

---

## Como rodar localmente

1. Instale dependências: `npm install`
2. Configure o `.env` com as variáveis acima
3. Inicie em modo desenvolvimento: `npm run dev`

A API ficará disponível em `http://localhost:3000` (ou porta definida em `PORT`).

---

## Endpoints principais (resumo)

- `POST /auth/login` - login (JWT)
- `GET/POST/PUT/DELETE /admin` - rotas de administração
- `GET/POST/PUT/DELETE /aluno` - CRUD de alunos
- `GET/POST/PUT/DELETE /curso` - CRUD de cursos
- `GET/POST/PUT/DELETE /disciplina` - CRUD de disciplinas
- `GET/POST /matricula` - realizar / listar matrículas
- `GET/POST/PUT/DELETE /prerequisito` - gerenciar pré-requisitos
- `GET/POST/PUT/DELETE /turma` - gerenciar turmas

Consulte os controladores em `src/modules/*/*.controller.ts` para detalhes das rotas e parâmetros.

---

## Documentação (Swagger)

Se o Swagger estiver configurado em `main.ts`, acesse a rota correspondente para a documentação interativa (ex.: `/docs` ou `/api/docs`).

---

## Contribuição

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Faça as alterações e envie um PR

---

## Licença

Projeto sem licença especificada — adicionar `LICENSE` conforme necessário.
Projeto Rematrícula – API Completa com Swagger

Este repositório contém uma API RESTful desenvolvida em NestJS para gerenciamento completo do processo de rematrícula acadêmica.
O projeto segue arquitetura modular, autenticação robusta e documentação detalhada.

##🔧 Funcionalidades Principais 

Autenticação JWT com suporte adicional a Google OAuth2

Documentação completa via Swagger, disponível em /docs

Arquitetura modular NestJS

Entidades principais:

Aluno

Curso

Disciplina

PreRequisito

Turma

MatriculaAluno

Validação com DTOs

Decorators do Swagger em todos os endpoints

Guards de autenticação e papéis (Roles)

Integração com Supabase (PostgreSQL)

Via DATABASE_URL

Fallback automático para SQLite no ambiente de desenvolvimento

🚀 Como rodar localmente

Copie o arquivo .env.example para .env
Preencha:

DATABASE_URL (Postgres/Supabase)

JWT_SECRET



Qualquer outra variável necessária

Instale as dependências:

npm install
npm install --save-dev bcrypt

Inicie o projeto em modo desenvolvimento:

npm run dev


Acesse a documentação Swagger:

http://localhost:3000/docs