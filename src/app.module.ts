import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsModule } from './aws/aws.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilesModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AwsModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        accessKeyId: config.get('ACCESS_KEY_ID'),
        secretAccessKey: config.get('SECRET_ACCESS_KEY'),
        region: config.get('AWS_REGION'),
      }),
      inject: [ConfigService],
    }),
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
