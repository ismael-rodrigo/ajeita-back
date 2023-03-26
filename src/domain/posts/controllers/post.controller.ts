import { OwnerPostGuard } from '../post.guard';
import { AuthGuard } from '@nestjs/passport';
import { Delete, Param, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { PostsPaginatedService } from './../services/posts-paginated.service';
import { Controller, Get, Query, Post, Req, HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';
import { PostCrudService } from '../services/post-crud.service';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import {Express} from 'express'
import { BucketProvider } from 'src/domain/_ports/bucket-provider/bucket-provider.abstract';

@Controller('post')
export class PostController {
    constructor(
        private readonly postsPaginatedService:PostsPaginatedService,
        private readonly postCrudService: PostCrudService,
        private readonly bucketProvider: BucketProvider
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


    @UseGuards(OwnerPostGuard)
    @Post(':id/image')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile( @Param('id') id:string , @UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
            fileType: /(gif|jpe?g|png)$/i
            })
            .addMaxSizeValidator({
            maxSize: 100000
            })
            .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
        )
        file: Express.Multer.File,
    ){
        const urlUploadedFile = await this.bucketProvider.saveFile(file)
        const resultUpdate = await this.postCrudService.updateImageUrl(id , urlUploadedFile.url)
        return { url : resultUpdate.imageUrl }
    }
    



}