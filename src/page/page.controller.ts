import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { HhService } from 'src/hh/hh.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { FindPageDto } from './dto/find-page.dto';
import { PageService } from './page.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreatePageDto } from './dto/create-page.dto';
import { NOT_FOUND_PAGE_ERROR } from './page.constants';

@Controller('page')
export class PageController {
	constructor(
		private readonly pageService: PageService,
		private readonly hhService: HhService,
	) {}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreatePageDto) {
		return this.pageService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const page = await this.pageService.findById(id);
		if (!page) {
			throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
		}
		return page;
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const page = await this.pageService.findByAlias(alias);
		if (!page) {
			throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
		}
		return page;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const detetedPage = await this.pageService.deleteById(id);
		if (!detetedPage) {
			throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
		}
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreatePageDto) {
		const updatedPage = await this.pageService.updateById(id, dto);
		if (!updatedPage) {
			throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
		}
		return updatedPage;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindPageDto) {
		return this.pageService.findByCategory(dto.firstCategory);
	}

	@Get('textSearch/:text')
	async textSearch(@Param('text') text: string) {
		return this.pageService.findByText(text);
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async test() {
		const data = await this.pageService.findForHhUpdate(new Date());

		for (let page of data) {
			const hhData = await this.hhService.getData(page.category);

			page.hh = hhData;

			await this.pageService.updateById(page._id, page);
		}
	}
}
