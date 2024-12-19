import clsx from 'clsx';

import Header from '../../Containers/Header';
import styles from './PageApartments.module.css';
import ApartmentFilters from '../../Containers/ApartmentFilters';
import FormFloatAdd from '../../Containers/FormFloatAdd';
import { useUnit } from 'effector-react';
import { $apartments } from '../../Models/apartments/state';
import ApartmentCard from '../../Components/ApartmentCard';
import { useApartmentsFilters } from '../../Facades/useApartmentsFilters';
import { useEffect } from 'react';
import { getApartmentsFx } from '../../Models/apartments/effects';
import Loader from '../../Components/Loader';
import { getResidencesHandbookFx } from '../../Models/residences/effects';
import HeaderBanner from '../../Containers/HeaderBanner';
function PageApartments() {
	const [apartments] = useUnit([$apartments]);
	const { loading, searching } = useApartmentsFilters();
	
	useEffect(() => {
		getApartmentsFx({});
		getResidencesHandbookFx();
	}, []);
	const showDataTip = !loading && !searching && apartments.length === 0;

	return (
		<div className={clsx(styles.root)}>
			<Header />
			<HeaderBanner />
			<ApartmentFilters />
			<FormFloatAdd />
			{!loading && !searching ? (
				<div className={styles.catalog}>
					{apartments.map((apartment) => (
						<ApartmentCard key={apartment.id} cardInfo={apartment} />
					))}
				</div>
			) : (
				<Loader className={styles.loader} />
			)}
			{showDataTip && <div className={styles.tip}>Нет данных по квартирам</div>}
		</div>
	);
}

export default PageApartments;
