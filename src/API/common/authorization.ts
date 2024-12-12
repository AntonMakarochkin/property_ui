import axios from 'axios';

export async function fetchAuthorizeUser(params: any): Promise<any> {
	const response = axios.post('http://91.197.98.253:8086/authorize_user', {
		params,
	});
	return response;
}

export async function fetchAuthorizeUserById(id: number): Promise<any> {
	const response = await axios.get(
		`http://91.197.98.253:8086/authorize_user_by_id/${id}`,
	);

	return response;
}

export async function fetchConfirmUser(
	email: string,
): Promise<{ confirmed: boolean }> {
	const response = await axios.get(
		`http://91.197.98.253:8086/confirm_user/${email}`,
	);
	const { data } = response;
	return data;
}

export async function fetchResetUser(email: string) {
	const response = axios.post('http://91.197.98.253:8086/reset_user', {
		email,
	});
	return response;
}

export async function fetchAddUser(user: any): Promise<any> {
	const response = axios.post('http://91.197.98.253:8086/add_user', {
		user,
	});
	return response;
}

// export async function checkUserReseting(id: string) {
// 	const response = await axios.get(
// 		`http://91.197.98.253:8086/check_user_reset/${id}`,
// 	);

// 	return response;
// }

export default {};
