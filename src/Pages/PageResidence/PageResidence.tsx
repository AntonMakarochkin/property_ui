import { useResidences } from '../../Facades/useResidences';
import clsx from 'clsx';
import Header from '../../Containers/Header';
import FloatFilters from '../../Containers/ApartmentFilters/ApartmentFilters';
import Swiper from '../../Containers/Swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './PageResidence.module.css';
import SwiperBenefits from '../../Containers/SwiperBenefits';
import { useApartmentsFilters } from '../../Facades/useApartmentsFilters';
import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { $apartments } from '../../Models/apartments/state';
import ApartmentCard from '../../Components/ApartmentCard';
import Loader from '../../Components/Loader';

function PageResidence() {
	const { currentResidence } = useResidences();
	const { name, description, parameters } = currentResidence;
	const { handlerSetFilterByKey } = useApartmentsFilters();
	const [apartments] = useUnit([$apartments]);
	const { loading, searching } = useApartmentsFilters();
	useEffect(() => {
		handlerSetFilterByKey('residence', name);
	}, []);
	const [area, remoteness, priceFrom] = parameters;
	const showDataTip = !loading && !searching && apartments.length === 0;
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
			<FloatFilters disabledProject />
			{!loading && !searching ? (
				<div className={styles.catalog}>
					{apartments.map((apartment) => (
						<ApartmentCard key={apartment.id} cardInfo={apartment} />
					))}
				</div>
			) : (
				<div className={styles.container_loader}>
					<Loader className={styles.loader} />
				</div>
			)}
						{showDataTip && <div className={styles.tip}>Нет данных по квартирам</div>}
		</div>
	);
}

export default PageResidence;
