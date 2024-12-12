import { createStore } from 'effector';
import { AUTHORIZATION_FIELDS } from '../../Shared/constants';
import { AuthorizationFormFields, ConfirmStatus, UserStatuses } from './types';
import {
	resetAuthorizationFieldsEv,
	resetAuthorizationStatusEv,
	resetConfirmStatusEv,
	resetUserEv,
} from './events';

export const $authorizationStatus = createStore<boolean>(false).reset(
	resetAuthorizationStatusEv,
);

export const $confirmStatus = createStore<ConfirmStatus>(
	UserStatuses.Default,
).reset(resetConfirmStatusEv);

export const $user = createStore<any>({}).reset(resetUserEv);

export const $authorizationFields = createStore<AuthorizationFormFields>(
	AUTHORIZATION_FIELDS,
).reset(resetAuthorizationFieldsEv);

export const $modalOpen = createStore<boolean>(false);
