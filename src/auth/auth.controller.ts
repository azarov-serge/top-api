import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { TelegramService } from '../telegram/telegram.service';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { USER_ALREADY_EXISTS } from './auth.constants';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly telegramService: TelegramService,
	) {}


	@UsePipes(new ValidationPipe())
	@Post('notify')
	async notify(@Body() dto: { email: string }) {
		const message = `Register new user with email: ${dto.email}`;
		return this.telegramService.sendMessage(message);
	}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const oldUser = await this.authService.findUser(dto.email);

		if (oldUser) {
			throw new BadRequestException(USER_ALREADY_EXISTS);
		}

		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		const user = await this.authService.validateUser(dto.email, dto.password);

		return this.authService.login(user.email);
	}
}
