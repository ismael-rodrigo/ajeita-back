import { AuthModule } from './../domain/auth/auth.module';
import { UserModule } from './../domain/user/user.module';
import { Module } from '@nestjs/common';
import { PostModule } from 'src/domain/posts/post.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    UserModule ,
    PostModule , 
    AuthModule , 
    ConfigModule.forRoot({ load: [configuration] })],
    
})
export class AppModule {}
