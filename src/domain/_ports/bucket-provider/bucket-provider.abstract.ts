

export abstract class BucketProvider {
    abstract saveFile(file : Express.Multer.File):Promise<{url:string}>
}