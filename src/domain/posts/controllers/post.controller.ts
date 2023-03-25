import { PostsPaginatedService } from './../services/posts-paginated.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('post')
export class PostController {
    constructor(
        private readonly postsPaginatedService:PostsPaginatedService
    ){}

    @Get()
    async posts(@Query('page') page:number , @Query('take') take:number ,  @Query('search') search?:string, @Query('tag') tag?:number ){

        const result = await this.postsPaginatedService.execute({page:Number(page) ,take:Number(take) , search , tag:Number(tag) })
        return result
    }
}