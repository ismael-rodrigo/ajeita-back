import { HTTP_ERROR } from './../../../shared/errors-helper';
import { PostEntity } from '../../../domain/_entities/post/post';
import { getQueryFromSearchPhrase } from './../../../../utils/get-query-from-search-phrase';
import { PrismaClientProvider } from './../prisma-client';
import { Post, Prisma } from '@prisma/client';
import { PostRepository } from 'src/domain/_ports/repository/post-repository/post-repository';
import { BadRequestException } from '@nestjs/common';



export class PostRepositoryPrisma extends PrismaClientProvider implements PostRepository {
    constructor(){ super() }

    async updateImageUrl(postId: string, url: string): Promise<Post> {
        try{
            return await this.client.post.update({
                where:{
                    id:Number(postId)
                },
                data:{
                    imageUrl:url
                }
            })
        }
        catch(error){
            throw new BadRequestException(HTTP_ERROR.INTERNAL_ERROR_IN_REPOSITORY)
        }
    }

    async postsPaginated({skip , take , search , tag}:{skip:number , take:number , tag?:number , search?:string }): Promise<Post[]> {
        const _search = search ? getQueryFromSearchPhrase(search) : undefined
        try{
            const result = await this.client.post.findMany({
                skip,
                take,
                where:{
                    OR: _search && [
                        { title: { search: _search }},
                        { content: { search: _search }},
                    ],

                    tagId: tag ? tag:undefined
                },
                orderBy:{
                    id:'desc'
                }
            })
            return result
        }
        catch(error){
            throw new BadRequestException(HTTP_ERROR.INTERNAL_ERROR_IN_REPOSITORY)
        }
    }
    findMany(): Promise<Post[]> {
        throw new Error('Method not implemented.');
    }
    async findById(id: string): Promise<Post> {
        try{
            return await this.client.post.findUnique({
                where:{
                    id:Number(id)
                }
            })
        }
        catch(error){
            throw new BadRequestException(HTTP_ERROR.INTERNAL_ERROR_IN_REPOSITORY)
        }
    }
    async add(post: PostEntity): Promise<Post> {
        try{
            return await this.client.post.create({
                data: {
                    title:post.title.value,
                    content:post.content.value,
                    authorId:post.authorId,
                    tagId: Number(post.tagId),
                    imageUrl:post.imageUrl
                }
            })
        }
        catch(error){
            throw new BadRequestException(HTTP_ERROR.INTERNAL_ERROR_IN_REPOSITORY)
        }
    }
    update(id: string, params: PostEntity): Promise<Post> {
        throw new Error('Method not implemented.');
    }
    async remove(id: string): Promise<string> {
        try{
            await this.client.post.delete({
                where: {
                    id:Number(id)
                }
            })
            return 'ok'
        }
        catch(error){
            throw new BadRequestException(HTTP_ERROR.INTERNAL_ERROR_IN_REPOSITORY)
        }
    }
}
    


