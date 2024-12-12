import { createEvent } from 'effector';

export const resetFilterEv = createEvent();

export const changeOpenModalEv = createEvent<boolean>();

export const changeApartmentsFormEv = createEvent<{key: string, value: any}>();

export const toggleSearchingEv = createEvent<boolean>();

export const resetFormFields = createEvent();


