import { StringifyOptions } from 'querystring';

export enum LevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export class PageModel {
	id: string;
	firstLevelCategorty: LevelCategory;
	secondCategory: string;
	title: string;
	category: string;
	hh?: {
		count: number;
		juniorScalary: number;
		middleScalary: number;
		seniorScalary: number;
	};
	advantages: {
		title: string;
		description: string;
	}[];
	seotext: string;
    tagstitle: string;
	tags: string[];
}
