import { UserRepository } from 'src/domain/_ports/repository/user-repository/user-repository';
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Hash } from 'node:crypto'


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService:JwtService,
        private readonly userRepo:UserRepository
        ){}

    login(id:string){
        const payload = { sub : id }
        
        return { 
            token: this.jwtService.sign(payload)
        }
    }

    async validateUser(email:string , password:string){
        const user = this.userRepo.fingByEmail(email)
        if(!user) throw new BadRequestException()

        return user
    }
}