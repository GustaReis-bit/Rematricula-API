import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { PreRequisitoService } from './prerequisito.service';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreatePreReqDto } from './dto/create-prereq.dto';

@ApiTags('PreRequisito')
@Controller('prerequisito')
export class PreRequisitoController {
  constructor(private service: PreRequisitoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria associação de pré-requisito entre disciplinas' })
  create(@Body() body: CreatePreReqDto) {
    return this.service.create(body.disciplinaId, body.disciplinaRequisitoId);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os pré-requisitos' })
  findAll() {
    return this.service.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um pré-requisito específico' })
  @ApiParam({ name: 'id', description: 'ID do pré-requisito' })
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
