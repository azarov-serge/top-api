import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindByCategoryProductDto } from './dto/find-by-category-product.dto';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
	constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {}

	async create(dto: CreateProductDto): Promise<ProductModel> {
		return this.productModel.create(dto);
	}

	async delete(id: string): Promise<ProductModel | null> {
		return this.productModel.findByIdAndDelete(id).exec();
	}

	async update(id: string, dto: CreateProductDto): Promise<ProductModel | null> {
		return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findByIdWithReviews(id: string): Promise<ProductModel | null> {
		const products = await this.productModel
			.aggregate([
				{
					$match: {
						_id: new Types.ObjectId(id),
					},
				},
				{
					$sort: {
						_id: 1,
					},
				},
				{
					$limit: 1,
				},
				{
					$lookup: {
						// Collection Review
						from: 'Review',
						localField: '_id',
						foreignField: 'productId',
						as: 'reviews',
					},
				},
				{
					$addFields: {
						reviewCount: { $size: '$reviews' },
						reviewAvg: { $avg: '$reviews.rating' },
						reviews: {
							$function: {
								body: `function (reviews) {
								reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
								return reviews;
							}`,
								args: ['$reviews'],
								lang: 'js',
							},
						},
					},
				},
			])
			.exec();

		return products && products.length ? products[0] : null;
	}

	async finByCategoryWithReviews(dto: FindByCategoryProductDto) {
		return this.productModel
			.aggregate([
				{
					$match: {
						categories: dto.category,
					},
				},
				{
					$sort: {
						_id: 1,
					},
				},
				{
					$limit: dto.limit,
				},
				{
					$lookup: {
						// Collection Review
						from: 'Review',
						localField: '_id',
						foreignField: 'productId',
						as: 'reviews',
					},
				},
				{
					$addFields: {
						reviewCount: { $size: '$reviews' },
						reviewAvg: { $avg: '$reviews.rating' },
						reviews: {
							$function: {
								body: `function (reviews) {
									reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
									return reviews;
								}`,
								args: ['$reviews'],
								lang: 'js',
							},
						},
					},
				},
			])
			.exec();
	}
}
