import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;
export class PasswordEntity {
    public readonly value:string

    private constructor(password_hashed:string){
        this.value = password_hashed
    }

    static async create(password:string): Promise<PasswordEntity>{
        if(!PasswordEntity.validate(password)){
            throw new BadRequestException()
        }
        const passwordHashed = await bcrypt.hash(password, saltOrRounds)
        return new PasswordEntity(passwordHashed)
    }

    static validate(password:string):boolean{
        if(
            !password || 
            password.trim().length < 8 || 
            password.trim().length > 15 ||
            /(\s)/.test(password)
            ) return false
       
        return true
    }
    static async compare(password:string, hash:string){
        return bcrypt.compare(password, hash);
    }
}