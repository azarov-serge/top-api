import {
	Body,
	Controller,
	Delete,
	Get,
	// HttpException,
	// HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string): Promise<void> {
		const deletedReview = await this.reviewService.delete(id);

		if (!deletedReview) {
			// as an example
			// throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
			throw new NotFoundException(REVIEW_NOT_FOUND);
		}
	}

	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: ReviewModel) {
		const updatedReview = await this.reviewService.update(id, dto);

		if (!updatedReview) {
			throw new NotFoundException(REVIEW_NOT_FOUND);
		}

		return updatedReview;
	}

	@Get('byProduct/:productId')
	async getByProductId(@Param('productId', IdValidationPipe) productId: string) {
		return this.reviewService.findByProductId(productId);
	}
}
