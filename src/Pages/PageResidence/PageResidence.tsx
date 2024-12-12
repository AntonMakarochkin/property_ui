import { useResidences } from '../../Facades/useResidences';
import clsx from 'clsx';
import Header from '../../Containers/Header';
import FloatFilters from '../../Containers/ApartmentFilters/ApartmentFilters';
import Card from '../../Components/Card';
import Swiper from '../../Containers/Swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './PageResidence.module.css';
import SwiperBenefits from '../../Containers/SwiperBenefits';

function PageResidence() {
	const { currentResidence } = useResidences();
	const { name, description, parameters } = currentResidence;
	const [area, remoteness, priceFrom] = parameters;
	console.log(currentResidence);
	return (
		<div className={clsx(styles.root)}>
			<Header />
			<section className={styles.info}>
				<div className={styles.name}>
					{name}
					<div className={styles.parameters}>
						<span>от {priceFrom}р</span>
						<span>от {area}м2</span>
						<span>{remoteness} минут до моря</span>
					</div>
				</div>
				<div className={styles.about}>
					<span>О проекте</span>
					<span>{description}</span>
				</div>
				<Swiper />
			</section>
			<SwiperBenefits />
			<FloatFilters />
			<div className={styles.catalog}>
				<Card />
				<Card />
				<Card />
			</div>
		</div>
	);
}

export default PageResidence;
