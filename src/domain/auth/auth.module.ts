import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';



@Module({
    imports: [
      PassportModule,
      JwtModule.register({privateKey:'asdasdasda', secret: 'asldmsapidnsapindaio' }) ,
    ],
    controllers:[AuthController],
    providers:[AuthService ,LocalStrategy , JwtStrategy]

  })
export class AuthModule {}