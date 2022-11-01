import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import {FindPageDto} from './dto/find-page.dto';
import { PageModel } from './page.model';

@Controller('top-page')
export class PageController {
	@Post('create')
	async create(@Body() dto: Omit<PageModel, 'id'>) {}

	@Get(':id')
	async get(@Param('id') id: string) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: PageModel) {}

	@HttpCode(200)
	@Post(':id')
	async find(@Param('id') id: string, @Body() dto: FindPageDto) {}
}
