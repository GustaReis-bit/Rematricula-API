import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Curso')
@Controller('curso')
export class CursoController {
  constructor(private service: CursoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo curso' })
  @ApiResponse({ status: 201, description: 'Curso criado com sucesso.' })
  create(@Body() dto: CreateCursoDto) { return this.service.create(dto); }

  @Get()
  @ApiOperation({ summary: 'Lista todos os cursos' })
  findAll() { return this.service.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um curso por id' })
  findOne(@Param('id') id: string) { return this.service.findOne(+id); }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um curso' })
  update(@Param('id') id: string, @Body() dto: CreateCursoDto) { return this.service.update(+id, dto); }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um curso' })
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
