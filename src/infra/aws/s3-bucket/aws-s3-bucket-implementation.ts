import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { BucketProvider } from 'src/domain/_ports/bucket-provider/bucket-provider.abstract';

@Injectable()
export class BucketProviderAwsS3 implements BucketProvider {
    private client: S3Client
    private readonly BUCKET_NAME: string
    private readonly BUCKET_REGION: string

    constructor( private configs:ConfigService ){ 
        this.BUCKET_NAME = configs.get<string>('aws.bucket.name')
        this.BUCKET_REGION = configs.get<string>('aws.bucket.region')
        this.client = new S3Client({ region: this.BUCKET_REGION });
    }

    async saveFile(file: Express.Multer.File): Promise<{ url: string; }> {
        const fileNameRandom = `${randomUUID()}-${file.originalname}`

        const command = new PutObjectCommand({
            Bucket: this.BUCKET_NAME,
            Key:fileNameRandom,
            Body:file.buffer,
            ACL:'public-read',
            ContentType:file.mimetype
        })

        await this.client.send(command)
        
        return { url : `https://${this.BUCKET_NAME}.s3.${this.BUCKET_REGION}.amazonaws.com/${fileNameRandom}` }
    }
}