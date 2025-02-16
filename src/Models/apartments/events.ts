import { createEvent } from 'effector';
import { Apartment } from './types';

export const resetFilterEv = createEvent();

export const resetFiltersInResidenceEv = createEvent();

export const changeOpenModalEv = createEvent<boolean>();

export const changeApartmentsFormEv = createEvent<{key: string, value: any}>();

export const toggleSearchingEv = createEvent<boolean>();

export const resetFormFields = createEvent();

export const setCurrentApartmentEv = createEvent<Apartment>();

export const resetCurrentApartmentEv = createEvent();


