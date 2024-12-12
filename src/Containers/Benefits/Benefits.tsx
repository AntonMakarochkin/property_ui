import Build from '../../assets/Build.png';
import Guarantee from '../../assets/Guarantee.png';
import Map from '../../assets/Map.png';
import Realtor from '../../assets/Realtor.png';
import styles from './Benefits.module.css';

function Benefits() {
	return (
		<div className={styles.root}>
			<span className={styles.title}>Удобство и безопасность c Turkey Antalya Homes</span>
			<div className={styles.icons}>
				<div className={styles.icon}>
					<span className={styles.description}>Гарантия безопасности сделки</span>
					<img src={Guarantee} alt="изображение" />
				</div>
				<div className={styles.icon}>
					<span className={styles.description}>Новостройки по ценам застройщика</span>
					<img src={Build} alt="изображение" />
				</div>
				<div className={styles.icon}>
					<span className={styles.description}>
						Сделки с недвижимостью в любой точке мира
					</span>
					<img src={Map} alt="изображение" />
				</div>
				<div className={styles.icon}>
					<span className={styles.description}>Риелторы, которых рекомендуют</span>
					<img src={Realtor} alt="изображение" />
				</div>
			</div>
		</div>
	);
}

export default Benefits;
