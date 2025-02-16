import styles from './HeaderMobile.module.css';
import clsx from 'clsx';
import {
	AngleRight,
	LogoTelegram,
	Profile,
	SymbolDelete,
} from '../../Components/Icons';
import Authorization from '../Authorization';
import { useAuthorization } from '../../Facades/useAuthorization';
import { useState } from 'react';
import { changeModalOpenEv } from '../../Models/authorization/events';
import { NavLink } from 'react-router-dom';
import MobileProfile from '../MobileProfile';

function HeaderMobile() {
	const { authorizationStatus, user } = useAuthorization();
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<div className={clsx(styles.root)}>
			<span className={styles.name}>Turkey Antalya Homes</span>
			<button
				className={styles.button_burger}
				onClick={() => setShowSidebar(!showSidebar)}
			>
				<div />
				<div />
				<div />
			</button>
			<div
				className={clsx(styles.sidebar, {
					[styles.open]: showSidebar,
				})}
			>
				<div className={styles.title}>
					<span className={styles.name}>Turkey Antalya Homes</span>
					<button
						className={styles.button_close}
						onClick={() => setShowSidebar(!showSidebar)}
					>
						<SymbolDelete className={styles.icon_close} />
					</button>
				</div>

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
				{!authorizationStatus ? (
					<button
						className={styles.button_auth}
						onClick={() => changeModalOpenEv(true)}
					>
						<span>Профиль</span>
					</button>
				) : (
					<MobileProfile />
				)}
				<LogoTelegram className={styles.telegram} />
			</div>
			<Authorization />
		</div>
	);
}

export default HeaderMobile;
