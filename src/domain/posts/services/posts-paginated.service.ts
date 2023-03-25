import { Injectable } from '@nestjs/common';
import { PostRepository } from 'src/domain/_ports/repository/post-repository/post-repository';


interface QueryPostsPagineted {
    page:number
    take:number

    tag?:number
    search?:string
}


@Injectable()
export class PostsPaginatedService {

    constructor(
        private readonly postRepo:PostRepository
    ){}

    async execute({ page , take , search , tag }:QueryPostsPagineted){
        const skip = page < 1 ? 0 : (page - 1) * take
        const result = await this.postRepo.postsPaginated({ skip , take , search , tag })
        return {
            page: page,
            take: take,
            result: result
        }
    }
}