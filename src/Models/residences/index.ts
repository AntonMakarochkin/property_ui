import { getPayloadIfChanged } from '../../Shared/utils';

import { getResidencesFx, getResidencesHandbookFx } from './effects';
import { $residences, $residencesHandbook } from './state';

$residences.on(getResidencesFx.doneData, getPayloadIfChanged);

$residencesHandbook.on(getResidencesHandbookFx.doneData, getPayloadIfChanged);

