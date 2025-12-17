import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Disciplina')
@Controller('disciplina')
export class DisciplinaController {
  constructor(private service: DisciplinaService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma disciplina' })
  create(@Body() dto: CreateDisciplinaDto) { return this.service.create(dto); }

  @Get()
  @ApiOperation({ summary: 'Lista todas as disciplinas' })
  findAll() { return this.service.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Busca disciplina por id' })
  findOne(@Param('id') id: string) { return this.service.findOne(+id); }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove disciplina' })
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
