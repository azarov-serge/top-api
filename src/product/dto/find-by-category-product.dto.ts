import { IsNumber, IsString } from 'class-validator';

export class FindByCategoryProductDto {
	@IsString()
	category: string;

	@IsNumber()
	limit: number;
}
