import { Module } from '@nestjs/common';
import { UserRepositoryPrisma } from 'src/infra/prisma/repositories/user-repository-prisma';
import { UserRepository } from '../_ports/repository/user-repository/user-repository';
import { UserController } from './controller/user.controller';
import { UserCrudService } from './services/user-crud.service';


@Module({
    controllers: [ UserController ],

    providers: [
        UserCrudService,
        {
            provide: UserRepository ,
            useClass: UserRepositoryPrisma
        }
    ],
    exports:[
        {
            provide: UserRepository ,
            useClass: UserRepositoryPrisma
        }
    ]
})
export class UserModule{}