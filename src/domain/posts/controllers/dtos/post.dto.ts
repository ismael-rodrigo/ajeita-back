import { Exclude, Expose,  } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";


export class NewPostRequestBody {

    @IsNotEmpty()
    @IsString()
    public title: string

    @IsNotEmpty()
    @IsString()
    public content: string

    @IsNotEmpty()
    @IsString()
    public imageUrl = 'none-url'

    @IsNotEmpty()
    public tagId: string;

}




export class NewPostResponse {
    @Exclude() title: string
    @Exclude() content: string
    @Exclude() imageUrl: string
    @Exclude() authorId: string
    @Exclude() tagId: number
    @Expose() id: number
}