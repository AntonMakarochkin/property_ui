import { getPayloadIfChanged } from '../../Shared/utils';
import { authorizeUserFx } from './effects';
import { changeUserFieldsEv } from './events';

import { $user } from './state';

// $authorizationStatus.on(authorizeUserFx.doneData, (state, payload) => {});

$user
	.on(authorizeUserFx.doneData, getPayloadIfChanged)
	.on(changeUserFieldsEv, (state, [key, value]) => {
		return {
			...state,
			[key]: value,
		};
	});
