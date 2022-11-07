import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum LevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

/*
	As an example
	export enum LevelCategory {
		Courses = 1,
		Services = 2,
		Books = 3,
		Products = 4,
	}
*/

export class HhData {
	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;

	@prop()
	updatedAt: Date;
}

export class PageAdvantage {
	@prop()
	title: string;

	@prop()
	description: string;
}

export interface PageModel extends Base {}
export class PageModel extends TimeStamps {
	/*
		As an example
		@prop({ enum: LevelCategory, type: () => Number })
	*/
	@prop({ enum: LevelCategory })
	firstCategory: LevelCategory;

	@prop()
	secondCategory: string;

	@prop({ unique: true })
	alias: string;

	@prop()
	title: string;

	@prop()
	metaTitle: string;

	@prop()
	metaDescription: string;

	@prop()
	category: string;

	@prop({ type: () => HhData })
	hh?: HhData;

	@prop({ type: () => [PageAdvantage] })
	advantages?: PageAdvantage[];

	@prop()
	seoText?: string;

	@prop()
	tagsTitle: string;

	@prop({ type: () => [String] })
	tags: string[];
}
