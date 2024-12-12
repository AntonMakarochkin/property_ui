import { useUnit } from 'effector-react';
import { useParams } from 'react-router-dom';
import { $residences } from '../Models/residences/state';

export function useResidences() {
	let { id } = useParams();
	const [residences] = useUnit([$residences]);
	const currentResidence = residences.filter((item) => item.id === Number(id))[0];
	return { currentResidence };
}
