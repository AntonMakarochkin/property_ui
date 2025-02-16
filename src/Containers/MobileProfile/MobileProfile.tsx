import styles from './MobileProfile.module.css';
import { AngleRight } from '../../Components/Icons';
import { useAuthorization } from '../../Facades/useAuthorization';
import { NavLink } from 'react-router-dom';

function MobileProfile() {
	const { onResetAuthorization } = useAuthorization();

	return (
		<div className={styles.root}>
			<div className={styles.title}>Профиль</div>
			<NavLink className={styles.link} to={`/profile`}>
				<span>Перейти</span>
				<AngleRight className={styles.icon} />
			</NavLink>

			<button onClick={onResetAuthorization} className={styles.button}>
				<span>Выйти</span>
				<AngleRight className={styles.icon} />
			</button>
		</div>
	);
}

export default MobileProfile;
