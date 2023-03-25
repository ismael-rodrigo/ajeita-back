import { PostRepositoryPrisma } from './../../infra/prisma/repositories/post-repository-prisma';
import { PostRepository } from 'src/domain/_ports/repository/post-repository/post-repository';
import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { PostsPaginatedService } from './services/posts-paginated.service';
import { PostCrudService } from './services/post-crud.service';
import { OwnerPostGuard } from './post.guard';



@Module({
    controllers: [PostController],
    providers: [
        PostsPaginatedService,
        PostCrudService,
        {
            provide:PostRepository,
            useClass:PostRepositoryPrisma
        }
    ],
    exports:[]
})
export class PostModule{}