import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async (): Promise<void> => {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	await app.listen(1313);
};

bootstrap();
