import { IsString, IsNumber, Min, Max } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@Max(5, { message: 'Max rating value is 5' })
	@Min(1, { message: 'Min rating value is 1' })
	@IsNumber()
	rating: number;

	@IsString()
	productId: Types.ObjectId;
}
