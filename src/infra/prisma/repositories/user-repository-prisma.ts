import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User } from '@prisma/client';
import { UserRepository } from 'src/domain/_ports/repository/user-repository/user-repository';
import { PrismaClientProvider } from '../prisma-client';


export class UserRepositoryPrisma extends PrismaClientProvider implements UserRepository {
    constructor(){ super(); }

    async fingByEmail(email: string): Promise<User> {
        try{
            const result = await this.client.user.findUnique({where: { email }})
            return result
        }
        catch (error){
            throw new BadRequestException()
        }
    }

    async findMany(): Promise<User[]> {
        try{
            const result = await this.client.user.findMany()
            return result
        }
        catch (error){
            throw new BadRequestException()
        }
    }

    async findById(id: string): Promise<User> {
        try{
            const result = await this.client.user.findUnique({where: { id }})
            return result
        }
        catch (error){
            throw new BadRequestException()
        }
    }

    async add(params: Prisma.UserCreateInput): Promise<User> {
        try{
            const result = await this.client.user.create({data:params})
            return result
        }
        catch (error){
            throw new BadRequestException()
        }
    }
    
    async update(id: string, params: Prisma.UserCreateInput): Promise<User> {
        try{
            const result = await this.client.user.update({
                where:{
                    id
                },
                data: params
            })
            return result
        }
        catch (error){
            throw new BadRequestException()
        }
    }
    async remove(id: string): Promise<string> {
        try{
            await this.client.user.delete({
                where:{
                    id
                }
            })
            return 'ok'
        }
        catch (error){
            throw new BadRequestException()
        }
    }

}