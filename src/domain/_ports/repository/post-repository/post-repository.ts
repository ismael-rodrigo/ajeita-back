import { PostEntity } from '../../../_entities/post/post';
import { Prisma , Post } from "@prisma/client";
import { GenericCrudRepository } from "../generic-crud-repository";


export abstract class PostRepository extends GenericCrudRepository<PostEntity , Post> {
    abstract postsPaginated(params:{skip:number , take:number , tag?:number , search?:string }):Promise<Post[]>
}