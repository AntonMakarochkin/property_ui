import { useUnit } from 'effector-react';
import {
	$authorizationFields,
	$authorizationStatus,
	$confirmStatus,
	$modalOpen,
	$user,
} from '../Models/authorization/state';
import {
	changeModalOpenEv,
	resetAuthorizationFieldsEv,
	resetAuthorizationStatusEv,
	resetConfirmStatusEv,
	resetUserEv,
} from '../Models/authorization/events';

export function useAuthorization() {
	const [authorizationStatus, confirmStatus, authorizationFields, modalOpen, user] =
		useUnit([
			$authorizationStatus,
			$confirmStatus,
			$authorizationFields,
			$modalOpen,
			$user,
		]);
	function onResetAuthorization() {
		resetAuthorizationStatusEv();
		resetAuthorizationFieldsEv();
		resetConfirmStatusEv();
		resetUserEv();
		changeModalOpenEv(false);
	}
	return {
		authorizationStatus,
		confirmStatus,
		user,
		authorizationFields,
		modalOpen,
		onResetAuthorization,
	};
}
