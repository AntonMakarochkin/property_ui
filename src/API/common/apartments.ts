import axios from 'axios';
import { fetchApartmentsAdapter } from '../../Adapters/fetchApartmentsAdapter';
import { Filter } from '../../Models/apartments/types';

export async function fetchApartments(filters: Filter): Promise<any[]> {
  const response = await axios.get(
    `http://91.197.98.253:8086/apartments/get_all`, {params: filters}
  );
  const { data } = response;
  return fetchApartmentsAdapter(data);
}

export async function fetchAddApartment(params: any) {
	const { plan, photos, ...fields } = params;
	const formData = new FormData();
	formData.append('file', plan);
	photos.map((photo: any) => formData.append(photo.name, photo));
	Object.entries(fields).map(([key, value]: [string, any]) =>
		formData.append(key, value),
	);

	const response = axios.post('http://91.197.98.253:8086/add_apartment', formData);
	return response;
}
