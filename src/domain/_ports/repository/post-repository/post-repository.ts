import { Prisma , Post } from "@prisma/client";
import { GenericCrudRepository } from "../generic-crud-repository";


export abstract class PostRepository extends GenericCrudRepository<Prisma.PostCreateInput , Post> {
    abstract postsPaginated(params:{skip:number , take:number , tag?:number , search?:string }):Promise<Post[]>
}