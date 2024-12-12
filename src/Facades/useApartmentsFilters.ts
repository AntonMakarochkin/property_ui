import { useUnit } from 'effector-react';
import { $filters, $searching } from '../Models/apartments/state';

import { getApartmentsFx, setFilterFx } from '../Models/apartments/effects';
import { $residencesHandbook } from '../Models/residences/state';

export function useApartmentsFilters() {
	const [filters, loading, searching, residencesHandbook] = useUnit([
		$filters,
		getApartmentsFx.pending,
		$searching,
		$residencesHandbook,
	]);
	function handlerSetFilterByKey(key: keyof typeof filters, value: string) {
		setFilterFx({ key, value });
		// toggleSearchingEv(true);
	}
	function handlerSetFilterRooms(value: string) {
		if (!filters.rooms) return;
		if (filters.rooms.includes(value)) {
			setFilterFx({
				key: 'rooms',
				value: filters.rooms.filter((item) => item !== value),
			});
			return;
		}
		setFilterFx({ key: 'rooms', value: [...filters.rooms, value] });
		// toggleSearchingEv(true);
	}

	const selectResidences = residencesHandbook.map((residence) => ({
		id: residence,
		name: residence,
	}));
	return {
		filters,
		loading,
		searching,
		handlerSetFilterByKey,
		handlerSetFilterRooms,
		selectResidences,
	};
}
