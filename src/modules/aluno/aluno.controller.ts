import { Body, Controller, Delete, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Aluno')
@Controller('aluno')
export class AlunoController {
  constructor(private service: AlunoService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registra um novo aluno (autênticação interna)' })
  create(@Body() dto: CreateAlunoDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Retorna dados do aluno autenticado' })
  me(@Request() req) {
    return this.service.findOne(req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os alunos' })
  findAll() {
    return this.service.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um aluno' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
