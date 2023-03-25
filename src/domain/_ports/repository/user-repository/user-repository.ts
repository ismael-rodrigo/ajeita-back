import { Prisma, User } from '@prisma/client';
import { GenericCrudRepository } from 'src/domain/_ports/repository/generic-crud-repository';

export abstract class UserRepository extends GenericCrudRepository<Prisma.UserCreateInput , User> {
    abstract fingByEmail(email:string):Promise<User | null>
}