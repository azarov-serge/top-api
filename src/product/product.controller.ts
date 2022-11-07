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
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import {IdValidationPipe} from 'src/pipes/id-validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { FindByCategoryProductDto } from './dto/find-by-category-product.dto';
import { PRODUCT_NOT_FOUND } from './product.constats';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const product = await this.productService.findByIdWithReviews(id);

		if (!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUND);
		}

		return product;
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedProduct = await this.productService.delete(id);

		if (!deletedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND);
		}
	}

	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductModel) {
		const updatedProduct = await this.productService.update(id, dto);

		if (!updatedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND);
		}

		return updatedProduct;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find-by-category')
	async findByCategory(@Param() dto: FindByCategoryProductDto) {
		return this.productService.finByCategoryWithReviews(dto);
	}
}
