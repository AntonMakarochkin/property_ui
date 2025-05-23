import { createStore } from 'effector';

import { Apartment, Filter } from './types';
import {
	resetFilterEv,
	resetFiltersInResidenceEv,
	resetFormFields,
	toggleSearchingEv,
} from './events';
import { setFilterFx } from './effects';

export const $apartments = createStore<Apartment[]>([]);

export const $modalOpen = createStore<boolean>(false);

export const $apartmentsForm = createStore<{ [key: string]: any }>({}).reset(
	resetFormFields,
);

export const $filters = createStore<Filter>({
	residence: '0',
	rooms: [],
	priceFrom: '',
	priceTo: '',
	metersFrom: '',
	metersTo: '',
})
	.reset(resetFilterEv)
	.on(setFilterFx, (state, { key, value }) => ({ ...state, [key]: value }))
	.on(resetFiltersInResidenceEv, (state) => ({
		residence: state.residence,
		rooms: [],
		priceFrom: '',
		priceTo: '',
		metersFrom: '',
		metersTo: '',
	}));

export const $searching = createStore<boolean>(false).on(
	toggleSearchingEv,
	(_, value) => value,
);

export const $currentApartment = createStore<Partial<Apartment>>({})
