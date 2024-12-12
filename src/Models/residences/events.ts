import { createEvent } from 'effector';

export const changeResidenceFormEv = createEvent<{key: string, value: any}>();

export const changeOpenModalEv = createEvent<boolean>();

export const changeStepEv = createEvent<number>();

export const toggleModalCategory = createEvent<boolean>();

export const resetFormFieldsEv = createEvent();