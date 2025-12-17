import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login interno (email + senha) - retorna JWT' })
  @ApiBody({ schema: { properties: { email: { type: 'string' }, senha: { type: 'string' } } } })
  async login(@Body() body: { email: string; senha: string }) {
    const valid = await this.authService.validateUser(body.email, body.senha);
    if (!valid) return { error: 'Credenciais inválidas' };
    return this.authService.login(valid);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Retorna perfil do usuário autenticado' })
  profile(@Req() req: Request) {
    return (req as any).user;
  }
}
