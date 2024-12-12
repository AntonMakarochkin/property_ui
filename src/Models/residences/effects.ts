import { createEffect } from 'effector';

import { fetchResidences, fetchAddResidence, fetchResidencesHandbook } from '../../API';

export const getResidencesFx = createEffect(fetchResidences);

export const addResidencesFx = createEffect(fetchAddResidence);

export const getResidencesHandbookFx = createEffect(fetchResidencesHandbook);

