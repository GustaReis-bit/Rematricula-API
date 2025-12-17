import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  // -----------------------
  // POST /admin/register
  // -----------------------
  @Post('register')
  register(@Body() dto: CreateAdminDto) {
    return this.adminService.register(dto);
  }

  // -----------------------
  // POST /admin/login
  // -----------------------
  @Post('login')
  login(@Body() body: { email: string; senha: string }) {
    return this.adminService.login(body.email, body.senha);
  }

  // -----------------------
  // GET /admin/me
  // -----------------------
  @Get('me')
  async me(@Headers('authorization') token: string) {
    const jwt = token?.replace('Bearer ', '');

    const { data } = await this.adminService['supabase'].client.auth.getUser(jwt);

    return this.adminService.getMe(data.user.id);
  }
}
