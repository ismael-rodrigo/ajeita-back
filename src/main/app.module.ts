import { AuthModule } from './../domain/auth/auth.module';
import { UserModule } from './../domain/user/user.module';
import { Module } from '@nestjs/common';


@Module({
  imports: [UserModule , AuthModule],
})
export class AppModule {}
