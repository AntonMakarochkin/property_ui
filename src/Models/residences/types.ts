import { Category, Gallery } from '../../API/common/types';

export type Residence = {
	id: number;
	image: string;
	type: string;
	isTop: boolean;
	parameters: string[];
	name: string;
	description: string;
	categories: Category[];
	gallery: Gallery[];
};

export type Filter = {
	residenceId?: string;
};
