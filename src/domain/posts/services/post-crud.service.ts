import { PostEntity, PostEntityInput } from '../../_entities/post/post';
import { PostRepository } from 'src/domain/_ports/repository/post-repository/post-repository';
import { Injectable } from '@nestjs/common';



@Injectable()
export class PostCrudService {
    constructor(
        private readonly postRepository:PostRepository
    ){}

    async create( post: PostEntityInput){
        const postEntity = PostEntity.create(post)
        const postSaved = await this.postRepository.add(postEntity)
        return postSaved
    }

    async findById(id:string){
        return await this.postRepository.findById(id)
    }

    async delete(id:string){
        return await this.postRepository.remove(id)
    }

    async updateImageUrl( postId:string , imageUrl:string ){
        return await this.postRepository.updateImageUrl(postId , imageUrl)
    }

}