import { BadRequestException } from '@nestjs/common';
import { PrismaClientProvider } from './../prisma-client';
import { Post, Prisma } from '@prisma/client';
import { PostRepository } from 'src/domain/_ports/repository/post-repository/post-repository';



export class PostRepositoryPrisma extends PrismaClientProvider implements PostRepository {
    constructor(){ super() }

    async postsPaginated({skip , take , search , tag}:{skip:number , take:number , tag?:number , search?:string }): Promise<Post[]> {
        try{
            const result = await this.client.post.findMany({
                skip,
                take,
                where:{
                    AND:[
                        {
                        OR:[
                            { title:{ contains:search ? search : undefined } },
                            { content:{ contains:search ? search : undefined } },
                        ]
                        },

                        { tagId: tag ? tag : undefined },
                    ]
                },
                orderBy:{
                    id:'desc'
                }
            })
            return result
        }
        catch(error){
            throw new BadRequestException(error.message)
        }
    }
    findMany(): Promise<Post[]> {
        throw new Error('Method not implemented.');
    }
    findById(id: string): Promise<Post> {
        throw new Error('Method not implemented.');
    }
    add(params: Prisma.PostCreateInput): Promise<Post> {
        throw new Error('Method not implemented.');
    }
    update(id: string, params: Prisma.PostCreateInput): Promise<Post> {
        throw new Error('Method not implemented.');
    }
    remove(id: string): Promise<string> {
        throw new Error('Method not implemented.');
    }
}
    


