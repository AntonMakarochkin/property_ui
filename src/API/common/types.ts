export type ExampleProductResponse = {
	id: number;
	title: string;
	price: number;
	quantity: number;
	total: number;
	discountPercentage: number;
	discountedPrice: number;
	thumbnail: string;
};

export type ExampleCartResponse = {
	id: number;
	products: ExampleProductResponse[];
	total: number;
	discountedTotal: number;
	userId: number;
	totalProducts: number;
	totalQuantity: number;
};

export type ExampleResponse = {
	carts: ExampleCartResponse[];
	total: number;
	skip: number;
	limit: number;
};

export type Gallery = {
	id: number;
	parentId: number;
	url: string;
};

export type Category = {
	id: number;
	parentId: number;
	url: string;
	description: string;
	name: string;
};

export type ResidencesResponse = {
	id: number;
	image: string;
	area: string;
	priceFrom: string;
	remoteness: string;
	description: string;
	name: string;
	type: string;
	gallery: Gallery[];
	categories: Category[];
};
