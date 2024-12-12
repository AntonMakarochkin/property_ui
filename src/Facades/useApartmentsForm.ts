import { useUnit } from 'effector-react';
import { $apartmentsForm, $filters } from '../Models/apartments/state';
import { addApartmentFx, getApartmentsFx } from '../Models/apartments/effects';
import { changeOpenModalEv, resetFormFields } from '../Models/apartments/events';
import { getActiveFilters } from '../Shared/utils/getActiveFilters';

export function useApartmentsForm() {
	const [fields, filters] = useUnit([$apartmentsForm, $filters]);
	const activeFilters = getActiveFilters(filters);
	function handlerSaveApartment() {
		changeOpenModalEv(false)
		addApartmentFx({
			...fields,
			plan: fields?.plan?.[0],
			photos: Object.values(fields?.photos),
		})
		resetFormFields();
		setTimeout(() => {
				getApartmentsFx(activeFilters)
		}, 2500)

	}
	function onCloseModal() {
		console.log('first');
		changeOpenModalEv(false);
		resetFormFields();
	}
	return { fields, handlerSaveApartment, onCloseModal };
}
