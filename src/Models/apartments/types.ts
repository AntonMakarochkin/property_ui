export type Apartment = {
	flat: string;
	floor: string;
	residence: string;
	id: number;
	m2: string;
	parentId: string;
	price: string;
	type: string;
	url: string;
	year: string;
	rooms: string;
};

export type Filter = {
	residence?: string;
	rooms?: string[];
	priceFrom?: string;
	priceTo?: string;
	metersFrom?: string;
	metersTo?: string;
};

export type FilterEventProps = {
	key: string;
	value: string | string[]
}
