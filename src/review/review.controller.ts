import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import {ReviewModel} from './review.model';

@Controller('review')
export class ReviewController {
	@Post('create')
	async create(@Body() dto: Omit<ReviewModel, 'id'>) {}

    @Delete(':id')
	async delete(@Param('id') id: string) {}

    @Get(':byProduct/:productId')
	async getbyProduct(@Param('productId') productId: string) {}
}
