import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PageController } from './page.controller';
import { PageModel } from './page.model';

@Module({
	controllers: [PageController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: PageModel,
			},
		]),
	],
})
export class PageModule {}
