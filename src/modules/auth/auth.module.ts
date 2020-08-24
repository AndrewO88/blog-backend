import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { AuthService } from './servise/auth.service';
import { LocalStrategy } from './servise/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/auth.controller';


@Module({
  imports: [AdminModule, PassportModule],
  controllers:[AuthController],
  providers:[AuthService, LocalStrategy]
})
export class AuthModule {}
