import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ITelegramOptions } from './telegram.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Injectable()
export class TelegramService {
	bot: Telegraf;
	options: ITelegramOptions;
	constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOptions) {
        this.options = options;
        this.bot = new Telegraf(options.token);
    }

    async sendMessage(message: string, chatId = this.options.chatId) {
        console.log(chatId)
        await this.bot.telegram.sendMessage(chatId, message);
    }
}
