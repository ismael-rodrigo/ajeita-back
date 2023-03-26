import { ConfigService } from '@nestjs/config';
import { BucketProviderAwsS3 } from './../../infra/aws/s3-bucket/aws-s3-bucket-implementation';
import { BucketProvider } from 'src/domain/_ports/bucket-provider/bucket-provider.abstract';
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
        ConfigService,
        {
            provide:PostRepository,
            useClass:PostRepositoryPrisma
        },
        {
            provide:BucketProvider,
            useClass:BucketProviderAwsS3
        }
    ],
    exports:[]
})
export class PostModule{}