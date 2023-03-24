
export abstract class GenericCrudRepository<InputData , OutputData> {
    abstract findMany():Promise<OutputData[]>
    abstract findById(id:string):Promise<OutputData | null>
    abstract add(params:InputData):Promise<OutputData>
    abstract update(id:string , params:InputData):Promise<OutputData>
    abstract remove(id:string):Promise<string>
}