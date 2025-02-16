import { getPayloadIfChanged } from '../../Shared/utils';

import { getApartmentsFx } from './effects';
import { resetCurrentApartmentEv, setCurrentApartmentEv } from './events';
import { $apartments, $currentApartment, $searching } from './state';

$apartments.on(getApartmentsFx.doneData, getPayloadIfChanged);

$searching.on(getApartmentsFx.doneData, () => false);

$currentApartment
	.on(setCurrentApartmentEv, (_, apartment) => apartment)
	.reset(resetCurrentApartmentEv);
