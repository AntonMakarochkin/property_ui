import clsx from 'clsx';
import styles from './PageMain.module.css';
import ResidencesCatalog from '../../Containers/ResidencesCatalog';
import Installment from '../../Containers/Installment';
import Header from '../../Containers/Header';
import Benefits from '../../Containers/Benefits';
import Consultation from '../../Containers/Consultation';
import { useEffect } from 'react';
import { getResidencesFx } from '../../Models/residences/effects';
import HeaderBanner from '../../Containers/HeaderBanner';
import HeaderMobile from '../../Containers/HeaderMobile';

function PageMain() {
	useEffect(() => {
		getResidencesFx({});
	}, [])
	return (
		<div className={clsx(styles.root)}>
			<Header />
			<HeaderMobile />
			<HeaderBanner />
      <Consultation />
			<Benefits />
			<ResidencesCatalog />
			<Installment />
		</div>
	);
}

export default PageMain;
