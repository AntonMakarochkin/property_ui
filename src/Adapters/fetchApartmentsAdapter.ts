import { Apartment } from '../Models/apartments/types';

export function fetchApartmentsAdapter(data: Apartment[]): Apartment[] {
	if (!Array.isArray(data)) return [];
	return data;
}
