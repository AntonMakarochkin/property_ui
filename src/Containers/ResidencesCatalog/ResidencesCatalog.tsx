import { useUnit } from 'effector-react';
import { $residences } from '../../Models/residences/state';
import ResidenceCard from '../../Components/ResidenceCard';

import styles from './ResidencesCatalog.module.css';

function ResidencesCatalog() {
	const [residences] = useUnit([$residences]);
	return (
		<div className={styles.root}>
			<div className={styles.title}>
				<span>Каталог новостроек</span>
			</div>
			<div className={styles.catalog}>
				{residences.map((item) => (
					<ResidenceCard key={item.id} cardInfo={item} />
				))}
			</div>
		</div>
	);
}

export default ResidencesCatalog;
