import { getPayloadIfChanged } from '../../Shared/utils';

import { getApartmentsFx } from './effects';
import { $apartments, $searching } from './state';

$apartments.on(getApartmentsFx.doneData, getPayloadIfChanged);

$searching.on(getApartmentsFx.doneData, () => false);

