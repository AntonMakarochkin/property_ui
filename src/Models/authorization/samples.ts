import { sample } from 'effector';

import {
	$authorizationFields,
	$authorizationStatus,
	$confirmStatus,
	$modalOpen,
	$user,
} from './state';
import { addUserFx, authorizeUserFx, confirmUserFx } from './effects';
import { changeAuthorizationFieldsEv, changeModalOpenEv } from './events';
import { UserStatuses } from './types';

sample({
	clock: authorizeUserFx.doneData,
	source: $authorizationStatus,
	fn: (_, {data}) => {
		if (data.authorize) {
			return true;
		}
		return false;
	},
	target: $authorizationStatus,
});

sample({
	clock: authorizeUserFx.doneData,
	fn: ({data}) => data.user,
	target: $user,
});

sample({
	clock: changeAuthorizationFieldsEv,
	source: $authorizationFields,
	fn: (state, { key, value }) => {
		return { ...state, [key]: value };
	},
	target: $authorizationFields,
});

sample({
	clock: confirmUserFx.doneData,
	source: $confirmStatus,
	fn: (_, { confirmed }) => {
		if (confirmed) {
			return UserStatuses.Confirmed;
		}
		return UserStatuses.Free;
	},
	target: $confirmStatus,
});

sample({
	clock: addUserFx.doneData,
	source: $authorizationFields,
	fn: ({email, password}) => ({ email, password }),
	target: authorizeUserFx,
});

sample({
	clock: changeModalOpenEv,
	fn: (payload) => {
		return payload
	},
	target : $modalOpen	
})