import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { BucketProvider } from 'src/domain/_ports/bucket-provider/bucket-provider.abstract';
import { AwsConfig } from '../aws-config-provider';

export class BucketProviderAwsS3 extends AwsConfig implements BucketProvider {
    private client: S3Client
    constructor(){ 
        super();
        this.client = new S3Client({ region:this.BUCKET_REGION });
    }

    async saveFile(file: Express.Multer.File): Promise<{ url: string; }> {
        const fileNameRandom = `${randomUUID()}-${file.originalname}`

        const command = new PutObjectCommand({
            Bucket:this.BUCKET_NAME,
            Key:fileNameRandom,
            Body:file.buffer,
            ACL:'public-read',
            ContentType:file.mimetype
        })

        await this.client.send(command)
        
        return {url : `https://${this.BUCKET_NAME}.s3.${this.BUCKET_REGION}.amazonaws.com/${fileNameRandom}`}
    }
}