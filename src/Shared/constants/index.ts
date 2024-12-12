export const AUTHORIZATION_FIELDS = {
	email: '',
	name: '',
	password: '',
	role: '',
};
export const AUTHORIZATION_STATUS = {
	default: 'Проверка пользователя',
	confirmed: 'Вход',
	free: 'Регистрация',
};

export const RESIDENCES = [
	{
		id: '0',
		name: 'Любой',
	},
	{
		id: 'JOIS',
		name: 'JOIS',
	},
	{
		id: 'CityZen',
		name: 'CityZen',
	},
	{
		id: 'Famos',
		name: 'Famos',
	},
	{
		id: 'MOD',
		name: 'MOD',
	},
];

export const CATEGORY_INITIAL_STATE = {
	name: '',
	description: '',
	picture: {},
};

export const CONSULTATION_FORM_EXISTED_FIELDS = ['name', 'phone', 'comment'];
export const APARTMENT_FORM_EXISTED_FIELDS = [
	'residence',
	'flat',
	'floor',
	'm2',
	'price',
	'year',
	'rooms',
	'plan',
	'photos',
];
export const APARTMENT_FORM_FIELDS_COUNT = 9;
export const RESIDENCE_FORM_EXISTED_FIELDS = [
	'name',
	'description',
	'gallery',
	'priceFrom',
	'area',
	'remoteness',
	'type',
	'categories',
];

export const RESIDENCE_FORM_FIELDS_COUNT = 8;
export const CATEGORY_FORM_FIELDS_COUNT = 3;
