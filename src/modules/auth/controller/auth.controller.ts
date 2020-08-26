import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../servise/auth.service';
import { Connection, Repository } from 'typeorm';
import { AdminEntity } from '../../admin/model/admin.entity';


@Controller('auth')
export class AuthController {
  private adminRepository: Repository<AdminEntity>;

  constructor(
    private authService: AuthService,
    private connection: Connection,
  ) {
    this.adminRepository = this.connection.getRepository(AdminEntity);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
    // return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refresh(@Request() req) {
    const admin = await this.adminRepository.findOne(req.user.id);
    return this.authService.login(admin);
  }
}
