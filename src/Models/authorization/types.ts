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

export type ConfirmStatus = UserStatuses;
