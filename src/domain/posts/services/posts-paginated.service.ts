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
        const _page = page < 1 ? 0 : (page - 1)
        const _take =  take > 20 ? 20 : take
        const skip = _page * _take

        const result = await this.postRepo.postsPaginated({ skip , take , search , tag })
        
        return {
            page: page,
            take: take,
            result: result
        }
    }
}