import { LevelCategory } from '../page/page.model';

type routeMapType = Record<LevelCategory, string>;

export const CATEGORY_URL: routeMapType = {
	0: '/courses',
	1: '/services',
	2: '/books',
	3: '/products',
};
