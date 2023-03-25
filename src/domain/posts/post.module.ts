import { PostRepositoryPrisma } from './../../infra/prisma/repositories/post-repository-prisma';
import { PostRepository } from 'src/domain/_ports/repository/post-repository/post-repository';
import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { PostsPaginatedService } from './services/posts-paginated.service';



@Module({
    controllers: [PostController],
    providers: [
        PostsPaginatedService,
        {
            provide:PostRepository,
            useClass:PostRepositoryPrisma
        }
    ],
    exports:[]
})
export class PostModule{}