import styles from './HeaderBanner.module.css';
import LogoTurkey from '../../assets/LogoTurkey.png';
function HeaderBanner() {
	return (
		<section className={styles.info}>
			<div className={styles.text}>
				<span className={styles.double_column}>Все новостройки</span>
				{/* <img className={styles.flag} src=".\assets\LogoTurkey.png" alt="" /> */}
				<img className={styles.flag} src={LogoTurkey} alt="" />
				<span>Турции от застройщика</span>
			</div>
		</section>
	);
}

export default HeaderBanner;
