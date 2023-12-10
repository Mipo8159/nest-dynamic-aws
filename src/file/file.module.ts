import { Module } from '@nestjs/common';
import { AwsModule } from 'src/aws/aws.module';
import { FileService } from './file.service';
import { S3 } from 'aws-sdk';

@Module({
  imports: [AwsModule.forFeature(S3)],
  providers: [FileService],
  exports: [FileService],
})
export class FilesModule {}
