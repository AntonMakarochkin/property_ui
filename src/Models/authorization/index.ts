import { getPayloadIfChanged } from '../../Shared/utils';
import { authorizeUserFx } from './effects';

import { $user } from './state';

// $authorizationStatus.on(authorizeUserFx.doneData, (state, payload) => {});

$user.on(authorizeUserFx.doneData, getPayloadIfChanged);
