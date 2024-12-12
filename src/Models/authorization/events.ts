import { createEvent } from "effector";

export const changeAuthorizationFieldsEv = createEvent<{value: string, key: string}>();

export const resetAuthorizationFieldsEv = createEvent();

export const resetAuthorizationStatusEv = createEvent();

export const resetConfirmStatusEv = createEvent();

export const resetUserEv = createEvent();

export const changeModalOpenEv = createEvent<boolean>();
