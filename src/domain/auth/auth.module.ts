import { UserModule } from './../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { RolesGuard } from './roles.guard';
import { RefreshTokenStrategy } from './strategies/refresh.strategy';
import { ConfigService } from '@nestjs/config';



@Module({
    imports: [
      PassportModule,
      JwtModule.register({}) ,
      UserModule
    ],
    controllers:[AuthController],
    providers:[ AuthService , LocalStrategy , JwtStrategy ,RefreshTokenStrategy , RolesGuard ,ConfigService]

  })
export class AuthModule {}