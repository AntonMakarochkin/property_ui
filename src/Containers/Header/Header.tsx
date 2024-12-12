import styles from './Header.module.css';
import clsx from 'clsx';
import { LogoTelegram, Profile } from '../../Components/Icons';
import Authorization from '../Authorization';
import { useAuthorization } from '../../Facades/useAuthorization';
import { useState } from 'react';
import { changeModalOpenEv } from '../../Models/authorization/events';
import { NavLink } from 'react-router-dom';

function Header() {
	const { authorizationStatus, onResetAuthorization, user } =
		useAuthorization();
	const [showAuthMenu, setShowAuthMenu] = useState(false);

	return (
		<div className={clsx(styles.root)}>
			<span className={styles.name}>Turkey Antalya Homes</span>
			<NavLink
				className={({ isActive }) => clsx({ [styles.active]: isActive })}
				to={`/`}
			>
				Новостройки
			</NavLink>
			<NavLink
				className={({ isActive }) => clsx({ [styles.active]: isActive })}
				to={`/apartments`}
			>
				Планировки
			</NavLink>
			<NavLink
				className={({ isActive }) => clsx({ [styles.active]: isActive })}
				to={`/contacts`}
			>
				Контакты
			</NavLink>
			{user.role === 'admin' && (
				<NavLink to={`/residence_add`}>Добавить рез.</NavLink>
			)}
			<LogoTelegram className={styles.telegram} />
			{!authorizationStatus ? (
				<button
					className={styles.button_auth}
					onClick={() => changeModalOpenEv(true)}
				>
					<Profile className={styles.icon_profile} />
				</button>
			) : (
				<>
					<button
						className={styles.button_auth}
						onClick={() => setShowAuthMenu(!showAuthMenu)}
					>
						<Profile className={styles.icon_profile} />
					</button>
					{showAuthMenu && (
						<div
							className={styles.auth_menu}
							onMouseLeave={() => setShowAuthMenu(false)}
						>
							<button>ПРОФИЛЬ</button>
							<button onClick={onResetAuthorization}>ВЫЙТИ</button>
						</div>
					)}
				</>
			)}
			<Authorization />
		</div>
	);
}

export default Header;
