import { ResidencesResponse } from '../API/common/types';
import { Residence } from '../Models/residences/types';

export function fetchResidencesAdapter(
	data: ResidencesResponse[],
): Residence[] {
	if (!Array.isArray(data)) return [];
	return data.map((item) => {
		const {
			id,
			area,
			priceFrom,
			remoteness,
			description,
			name,
			type,
			gallery,
			categories,
		} = item;
		return {
			id,
			image: gallery[0]?.url,
			type,
			isTop: false,
			parameters: [area, remoteness, priceFrom],
			name,
			description,
			gallery,
			categories,
		};
	});
}
