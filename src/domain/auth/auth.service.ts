import { PasswordEntity } from '../_entities/generics/password';
import { UserRepository } from 'src/domain/_ports/repository/user-repository/user-repository';
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';
import Con from 'src/main/configuration';


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService:JwtService,
        private readonly userRepo:UserRepository,
        private readonly configService: ConfigService
        ){}

    async login(id:string){
        return this.generateTokens({ sub: id })
    }

    async validateUser(email:string , password:string){
        const user = await this.userRepo.fingByEmail(email)
        if(!user) throw new BadRequestException()
        if(! await PasswordEntity.compare(password , user.password)) throw new BadRequestException()
        return user
    }

    async generateTokens(payload:{ sub:string }){

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync( payload, this.configService.get<{secret:string , expiresIn:string}>('jwt.access')),
            this.jwtService.signAsync( payload, this.configService.get<{secret:string , expiresIn:string}>('jwt.refresh')),
            ])

        return { accessToken, refreshToken }
    }

    
}