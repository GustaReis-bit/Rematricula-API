import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { MatriculaService } from './matricula.service';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

import { EnrollDto } from './dto/enroll.dto';

@ApiTags('Matricula')
@Controller('matricula')
export class MatriculaController {
  constructor(private service: MatriculaService) {}

  @UseGuards(JwtAuthGuard)
  @Post('enroll')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Realiza matrícula em uma turma' })
  @ApiBody({ type: EnrollDto })
  @ApiResponse({ status: 201, description: 'Matrícula realizada' })
  @ApiResponse({ status: 400, description: 'Pré-requisitos não cumpridos' })
  enroll(@Body() body: EnrollDto, @Req() req) {
    return this.service.enroll(req.user.id, body.turmaId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Lista matrículas do aluno autenticado' })
  myMatriculas(@Req() req) {
    return this.service.findByAluno(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Remove matrícula do aluno autenticado' })
  @ApiParam({ name: 'id', description: 'ID da matrícula' })
  async deleteMatricula(@Param('id') id: string, @Req() req) {
    return this.service.deleteMatricula(id, req.user.id);
  }
}
