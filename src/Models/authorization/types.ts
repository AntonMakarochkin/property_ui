export type AuthorizationFormFields = {
	email: string;
	name: string;
	password: string;
	role: string;
}

export enum UserStatuses {
	Default = 'default',
	Confirmed = 'confirmed',
	Free = 'free',
}

export type User = {
	id: number;
	email: string;
	password: string;
	name: string;
	role: string;
}

export type ConfirmStatus = UserStatuses;
