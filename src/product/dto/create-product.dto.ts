import {Type} from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsArray, Min, ValidateNested } from 'class-validator';

export class ProductCharacteristicDto {
	@IsString()
	name: string;

	@IsString()
	value: string;
}

export class CreateProductDto {
	@IsString()
	image: string;

	@IsString()
	title: string;

	@Min(0)
	@IsNumber()
	price: number;

	@IsOptional()
	@Min(0)
	@IsNumber()
	oldPrice?: number;

	@Min(0)
	@IsNumber()
	credit: number;

	@IsString()
	description: string;

	@IsString()
	advantages: string;

	@IsString()
	disAdvantages: string;

	@IsArray()
	@IsString({ each: true })
	categories: string[];

	@IsArray()
	@IsString({ each: true })
	tags: string[];

	@IsArray()
	@ValidateNested()
    @Type(() => ProductCharacteristicDto)
	characteristics: ProductCharacteristicDto[];
}
