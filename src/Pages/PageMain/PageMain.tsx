import clsx from 'clsx';
import styles from './PageMain.module.css';
import ResidencesCatalog from '../../Containers/ResidencesCatalog';
import Installment from '../../Containers/Installment';
import Header from '../../Containers/Header';
import Benefits from '../../Containers/Benefits';
import Consultation from '../../Containers/Consultation';
import { useEffect } from 'react';
import { getResidencesFx } from '../../Models/residences/effects';

function PageMain() {
	useEffect(() => {
		getResidencesFx({});
	}, [])
	return (
		<div className={clsx(styles.root)}>
			<Header />
			<section className={styles.info}>
				<div className={styles.text}>
					<span className={styles.double_column}>Все новостройки</span>
					<img className={styles.flag} src="src\assets\LogoTurkey.png" alt="" />
					<span>Турции от застройщика</span>
				</div>
				{/* <div className={styles.available}>
					ВСЕ ВОЗМОЖНО - даже в другой стране
				</div> */}
			</section>
      <Consultation />
			<Benefits />
			<ResidencesCatalog />
			<Installment />
		</div>
	);
}

export default PageMain;
