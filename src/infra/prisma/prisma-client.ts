import { PrismaClient } from "@prisma/client";

export class PrismaClientProvider {
    client:PrismaClient
    constructor(){
        this.client = new PrismaClient({})
    }
}
