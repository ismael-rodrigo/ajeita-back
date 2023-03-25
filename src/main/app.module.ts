import { AuthModule } from './../domain/auth/auth.module';
import { UserModule } from './../domain/user/user.module';
import { Module } from '@nestjs/common';
import { PostModule } from 'src/domain/posts/post.module';


@Module({
  imports: [UserModule ,PostModule , AuthModule],
})
export class AppModule {}
