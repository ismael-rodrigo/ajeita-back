import { UserEntity } from '../../../_entities/user/user';
import { Prisma, User } from '@prisma/client';
import { GenericCrudRepository } from 'src/domain/_ports/repository/generic-crud-repository';

export abstract class UserRepository extends GenericCrudRepository<UserEntity , User> {
    abstract fingByEmail(email:string):Promise<User | null>
}