import Input from '../../Components/Input';
import Button from '../../Components/Button';
import Modal from '../../Components/Modal';
import { useAuthorization } from '../../Facades/useAuthorization';
import { changeAuthorizationFieldsEv } from '../../Models/authorization/events';
import styles from './Authorization.module.css';
import { UserStatuses } from '../../Models/authorization/types';
import { addUserFx, authorizeUserFx, confirmUserFx } from '../../Models/authorization/effects';
import clsx from 'clsx';
import { useState } from 'react';
import { AUTHORIZATION_STATUS } from '../../Shared/constants';

function Authorization() {
	const { authorizationStatus, confirmStatus, authorizationFields, modalOpen, onResetAuthorization } =
		useAuthorization();
	const { email, name, password } = authorizationFields;
	const [showPassword, setShowPassword] = useState('password');
	function handlerTogglePasswordType(type: string) {
		if (type === 'text') {
			setShowPassword('password');
		} else {
			setShowPassword('text');
		}
	}
	if (authorizationStatus) return;
	return (
		<Modal className={styles.modal} isOpen={modalOpen} onClose={onResetAuthorization} title={AUTHORIZATION_STATUS[confirmStatus]}>
			<div className={styles.content}>
				{confirmStatus === UserStatuses.Default && (
					<>
						<Input
							placeholder="E-mail"
							onChange={({ target }) =>
								changeAuthorizationFieldsEv({
									key: 'email',
									value: target.value,
								})
							}
							outline
							value={email}
							className={styles.input}
							autoComplete="off"
							// onBlur={({ target }) => handlerCheckInput(target.value, 'email')}
							// message={isErrors.email ? 'Обязательное поле' : undefined}
						/>
						<Button
							className={styles.button}
							onClick={() => confirmUserFx(email)}
						>
							Далее
						</Button>
					</>
				)}
				{confirmStatus === UserStatuses.Confirmed && (
					<>
						<Input
							placeholder="E-mail"
							onChange={({ target }) =>
								changeAuthorizationFieldsEv({
									key: 'email',
									value: target.value,
								})
							}
							outline
							value={email}
							className={styles.input}
							autoComplete="off"
							// onBlur={({ target }) => handlerCheckInput(target.value, 'email')}
						/>
						<div className={styles.password}>
							<Input
								placeholder="Пароль"
								onChange={({ target }) =>
									changeAuthorizationFieldsEv({
										key: 'password',
										value: target.value,
									})
								}
								outline
								value={password}
								className={clsx(styles.input_password, styles.input)}
								autoComplete="off"
								type={showPassword}
							/>
							<Button
								className={styles.button_show_password}
								onClick={() => handlerTogglePasswordType(showPassword)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="inherit"
									stroke="inherit"
									viewBox="0 0 16 8"
									width="13px"
									height="13px"
								>
									<path
										data-v-36a28b66=""
										d="M2.31489 0.212067L2.5514 0.763485C3.47211 2.91008 5.56964 4.4 7.99998 4.4C10.4303 4.4 12.5279 2.91008 13.4486 0.763485L13.6851 0.212067L14.7879 0.685091L14.5514 1.23651C14.3755 1.64656 14.1634 2.03711 13.9191 2.40391L15.5556 4.04043L14.707 4.88896L13.1683 3.35026C12.4965 4.06608 11.682 4.64312 10.7705 5.03352L11.6425 6.90364L10.5549 7.41078L9.6228 5.41179C9.10167 5.53488 8.55845 5.6 7.99998 5.6C7.37604 5.6 6.77113 5.51872 6.19479 5.36612L5.24135 7.41078L4.15378 6.90364L5.06076 4.95861C4.22609 4.5749 3.47738 4.03296 2.85123 3.37106L1.33333 4.88896L0.484802 4.04043L2.09712 2.42812C1.84595 2.05431 1.62832 1.6556 1.44857 1.23651L1.21205 0.685091L2.31489 0.212067Z"
									></path>
								</svg>
							</Button>
						</div>
						<Button className={styles.button} onClick={() => authorizeUserFx({email, password})}>
							Вход
						</Button>
					</>
				)}
				{confirmStatus === UserStatuses.Free && (
					<>
						<Input
							placeholder="Имя"
							onChange={({ target }) =>
								changeAuthorizationFieldsEv({
									key: 'name',
									value: target.value,
								})
							}
							outline
							value={name}
							className={styles.input}
							autoComplete="off"
						/>
						<Input
							placeholder="E-mail"
							onChange={({ target }) =>
								changeAuthorizationFieldsEv({
									key: 'email',
									value: target.value,
								})
							}
							outline
							value={email}
							className={styles.input}
							autoComplete="off"
						/>
						<div className={styles.password}>
							<Input
								placeholder="Пароль"
								onChange={({ target }) =>
									changeAuthorizationFieldsEv({
										key: 'password',
										value: target.value,
									})
								}
								outline
								value={password}
								className={clsx(styles.input_password, styles.input)}
								autoComplete="off"
								type={showPassword}
							/>
							<Button
								className={styles.button_show_password}
								onClick={() => handlerTogglePasswordType(showPassword)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="inherit"
									stroke="inherit"
									viewBox="0 0 16 8"
									width="13px"
									height="13px"
								>
									<path
										data-v-36a28b66=""
										d="M2.31489 0.212067L2.5514 0.763485C3.47211 2.91008 5.56964 4.4 7.99998 4.4C10.4303 4.4 12.5279 2.91008 13.4486 0.763485L13.6851 0.212067L14.7879 0.685091L14.5514 1.23651C14.3755 1.64656 14.1634 2.03711 13.9191 2.40391L15.5556 4.04043L14.707 4.88896L13.1683 3.35026C12.4965 4.06608 11.682 4.64312 10.7705 5.03352L11.6425 6.90364L10.5549 7.41078L9.6228 5.41179C9.10167 5.53488 8.55845 5.6 7.99998 5.6C7.37604 5.6 6.77113 5.51872 6.19479 5.36612L5.24135 7.41078L4.15378 6.90364L5.06076 4.95861C4.22609 4.5749 3.47738 4.03296 2.85123 3.37106L1.33333 4.88896L0.484802 4.04043L2.09712 2.42812C1.84595 2.05431 1.62832 1.6556 1.44857 1.23651L1.21205 0.685091L2.31489 0.212067Z"
									></path>
								</svg>
							</Button>
						</div>
						<Button className={styles.button} onClick={() => addUserFx({name, email, password})}>
							Регистрация
						</Button>
					</>
				)}
			</div>
		</Modal>
	);
}

export default Authorization;
