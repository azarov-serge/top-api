import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { UPLOAD_PATH } from './files.constants';

@Module({
  imports: [ServeStaticModule.forRoot({
  rootPath: `${UPLOAD_PATH}`,
  serveRoot: '/static'
  })],
	controllers: [FilesController],
	providers: [FilesService],
})
export class FilesModule {}
