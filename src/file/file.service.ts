import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'src/decorators/aws.decorator';

@Injectable()
export class FileService {
  constructor(
    @InjectAwsService(S3) private s3Service: S3,
    private readonly configService: ConfigService,
  ) {}

  getBuckets() {
    return this.s3Service
      .listObjects({ Bucket: this.configService.get('AWS_BUCKET') })
      .promise();
  }
}
