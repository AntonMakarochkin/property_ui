import { createEffect } from 'effector';

import { fetchAddUser, fetchAuthorizeUser, fetchChangeUser, fetchConfirmUser, fetchResetUser } from '../../API/common/authorization';

export const authorizeUserFx = createEffect(fetchAuthorizeUser);

export const confirmUserFx = createEffect(fetchConfirmUser);

export const resetUserFx = createEffect(fetchResetUser);

export const addUserFx = createEffect(fetchAddUser);

export const changeUserFx = createEffect(fetchChangeUser);


