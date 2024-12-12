import { ApartmentCardProps } from './types';

import styles from './ApartmentCard.module.css';

function ApartmentCard({ cardInfo }: ApartmentCardProps) {
	const { floor, residence, m2, price, url, year, rooms } = cardInfo;
	return (
		<div className={styles.root}>
			<div className={styles.title}>
				<span>{residence}</span>
				<span className={styles.build}>Athens</span>
			</div>
			<img src={url} alt="" />
			<div className={styles.price}>
				<span>{rooms}, {m2}м&#178;</span>
				<mark>{price} $</mark>
			</div>
			<div className={styles.info}>
				<span>7650$/м&#178;</span>
				<span>Год сдачи {year}</span>
				<span>{floor}/17 этаж</span>
			</div>
		</div>
	);
}

export default ApartmentCard;
