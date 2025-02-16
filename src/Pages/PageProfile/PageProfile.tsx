import clsx from 'clsx';

import styles from './PageProfile.module.css';
import HeaderBanner from '../../Containers/HeaderBanner';
import Header from '../../Containers/Header';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { useState } from 'react';
import { useUnit } from 'effector-react';
import { $user } from '../../Models/authorization/state';
import { changeUserFieldsEv } from '../../Models/authorization/events';
import { changeUserFx } from '../../Models/authorization/effects';
import HeaderMobile from '../../Containers/HeaderMobile';

function PageProfile() {
	const [showPassword, setShowPassword] = useState('password');
	const [user] = useUnit([$user]);
	const { name, email, password } = user;
	console.log(user);
	function handlerTogglePasswordType(type: string) {
		if (type === 'text') {
			setShowPassword('password');
		} else {
			setShowPassword('text');
		}
	}
	return (
		<div className={clsx(styles.root)}>
			<Header />
			<HeaderMobile />
			<HeaderBanner />
			<div className={styles.panel}>
				<Input
					placeholder="Введите имя"
					onChange={({ target }) => changeUserFieldsEv(['name', target.value])}
					value={name}
					className={styles.input}
					autoComplete="off"
					caption="Имя"
					// onBlur={({ target }) => handlerCheckInput(target.value, "email")}
				/>
				<hr />
				<Input
					placeholder="Введите email"
					onChange={({ target }) => changeUserFieldsEv(['email', target.value])}
					value={email}
					className={styles.input}
					autoComplete="off"
					caption="Email"
					// onBlur={({ target }) => handlerCheckInput(target.value, "email")}
				/>
				<hr />
				<div className={styles.password}>
					<Input
						placeholder="Пароль"
						onChange={({ target }) =>
							changeUserFieldsEv(['password', target.value])
						}
						value={password}
						className={clsx(styles.input_password, styles.input)}
						autoComplete="off"
						type={showPassword}
						caption="Пароль"
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
				<hr />
				<button className={styles.button_save} onClick={() => changeUserFx(user)}>Сохранить</button>
			</div>
		</div>
	);
}

export default PageProfile;
