import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FileService } from './file/file.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fileService: FileService,
  ) {}

  @Get()
  getHello() {
    return this.fileService.getBuckets();
  }
}
