import { UserEntity } from '../../_entities/user/user';
import { HttpException, Injectable } from '@nestjs/common';
import { GenericCrudRepository } from 'src/domain/_ports/repository/generic-crud-repository';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from 'src/domain/_ports/repository/user-repository/user-repository';


@Injectable()
export class UserCrudService {
    constructor(
        private readonly userRepo:UserRepository
    ){}

    async register(params:Prisma.UserCreateInput){
        const userEntity = await UserEntity.create(params)
        const userSaved = await this.userRepo.add(userEntity)
        return { id: userSaved.id }
    }

    getById(id:string){
        return this.userRepo.findById(id)
    }

}
