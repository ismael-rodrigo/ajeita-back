import { OwnerPostGuard } from '../post.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { PostEntity, PostEntityInput } from './../../../../dist/src/domain/_entities/post/post.entity.d';
import { AuthGuard } from '@nestjs/passport';
import { Delete, Param, SetMetadata, UseGuards } from '@nestjs/common/decorators';
import { PostsPaginatedService } from './../services/posts-paginated.service';
import { Controller, Get, Query, Post, Req } from '@nestjs/common';
import { PostCrudService } from '../services/post-crud.service';
import { Roles } from 'src/main/guards/roles/set-roles.decorator';


@Controller('post')
export class PostController {
    constructor(
        private readonly postsPaginatedService:PostsPaginatedService,
        private readonly postCrudService: PostCrudService
    ){}

    @Get('page')
    async posts(@Query('page') page:number , @Query('take') take:number ,  @Query('search') search?:string, @Query('tag') tag?:number ){
        const result = await this.postsPaginatedService.execute({page:Number(page) ,take:Number(take) , search , tag:Number(tag) })
        return result
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Req() req:any ){
        const payload = {
            title: req.body.title,
            content: req.body.title,
            imageUrl: req.body.imageUrl,
            tagId: req.body.tagId,
            authorId: req.user.id
        }

        const postSaved = await this.postCrudService.create(payload)
        return postSaved.id
    }

    @UseGuards(OwnerPostGuard)
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async delete( @Param('id') id:string){
        return await this.postCrudService.delete(id)
    }





}