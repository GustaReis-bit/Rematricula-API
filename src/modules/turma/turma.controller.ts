import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Turma')
@Controller('turma')
export class TurmaController {
  constructor(private service: TurmaService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma turma' })
  create(@Body() dto: CreateTurmaDto) { return this.service.create(dto); }

  @Get()
  @ApiOperation({ summary: 'Lista turmas (opcional filtro por período)' })
  findAll(@Query('periodo') periodo: string) {
    if (periodo) return this.service.findByPeriodo(periodo);
    return this.service.findAll();
  }

  @Get(':id') @ApiOperation({ summary: 'Busca turma por id' })
  findOne(@Param('id') id: string) { return this.service.findOne(+id); }

  @Delete(':id') @ApiOperation({ summary: 'Remove turma' })
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
