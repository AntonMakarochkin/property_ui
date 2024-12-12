import { createEffect } from 'effector';

import { fetchAddApartment, fetchApartments } from '../../API';
import { FilterEventProps } from './types';

export const getApartmentsFx = createEffect(fetchApartments);

export const addApartmentFx = createEffect(fetchAddApartment);

export const setFilterFx = createEffect((props: FilterEventProps) => props);