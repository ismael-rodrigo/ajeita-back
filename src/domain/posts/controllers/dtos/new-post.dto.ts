import { Exclude, Expose } from "class-transformer";


export class NewPostResponse {
    @Expose() title: string
    @Expose() content: string
    @Expose() imageUrl: string
    @Expose() authorId: string
    @Expose() tagId: number
    @Exclude() id: number
}