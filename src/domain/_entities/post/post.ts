import { BadRequestException } from '@nestjs/common';
import { ContentEntity } from '../generics/content';
import { TitleEntity } from '../generics/title';

export type PostEntityInput = {
    title:string , 
    content:string , 
    imageUrl:string , 
    authorId:string , 
    tagId:string
}

export class PostEntity {

    private constructor(
        public readonly title: TitleEntity,
        public readonly content: ContentEntity,
        public readonly imageUrl: string,
        public readonly authorId: string,
        public readonly tagId: string    
    ){}


    static create( { title , content , imageUrl , authorId , tagId, }: PostEntityInput ){
        const _title = TitleEntity.create(title)
        const _content = ContentEntity.create(content)
        if(!imageUrl) throw new BadRequestException()
        if(!authorId) throw new BadRequestException()
        if(!tagId) throw new BadRequestException()

        return new PostEntity(_title , _content , imageUrl ,authorId  ,tagId )
    }

}