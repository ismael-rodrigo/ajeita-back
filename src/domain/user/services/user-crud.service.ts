import { HttpException, Injectable } from '@nestjs/common';
import { GenericCrudRepository } from 'src/domain/_ports/repository/generic-crud-repository';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from 'src/domain/_ports/repository/user-repository/user-repository';


@Injectable()
export class UserCrudService {
    constructor(
        private readonly userRepo:UserRepository
    ){}

    register(params:Prisma.UserCreateInput){
        return this.userRepo.add(params)
    }

    getById(id:string){
        return this.userRepo.findById(id)
    }

}
