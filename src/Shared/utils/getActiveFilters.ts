import { Filter } from '../../Models/apartments/types';
export function getActiveFilters(settings: Filter) {
	const activeFilters = Object.fromEntries(
		Object.entries(settings)
			.map(([key, value]) => {
				return [key, value];
			})
			.filter(([, value]) => value?.length && value !== '0'),
	);
	return activeFilters;
}
