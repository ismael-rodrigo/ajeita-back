import { PasswordEntity } from '../generics/password';
import { PhoneEntity } from '../generics/phone';
import { NameEntity } from '../generics/name';
import { EmailEntity } from '../generics/email';
import { CpfEntity } from '../generics/cpf';
import { Prisma } from '@prisma/client';

export type UserEntityInput = {
    cpf: string
    email: string
    name: string
    password: string
    phone: string
}


export class UserEntity {
x
    private constructor(
        public readonly cpf: CpfEntity,
        public readonly email: EmailEntity,
        public readonly name: NameEntity,
        public readonly password: PasswordEntity,
        public readonly phone: PhoneEntity
    ){}


    static  async create( { cpf , email , password , phone , name }:UserEntityInput ): Promise<UserEntity>{
        const _cpf = CpfEntity.create(cpf)
        const _email = EmailEntity.create(email)
        const _name = NameEntity.create(name)
        const _pasword = await PasswordEntity.create(password)
        const _phone = PhoneEntity.create(phone)

        return new UserEntity( _cpf, _email, _name, _pasword, _phone )
    }

}