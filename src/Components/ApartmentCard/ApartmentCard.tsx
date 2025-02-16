import { ApartmentCardProps } from './types';

import styles from './ApartmentCard.module.css';
import { setCurrentApartmentEv } from '../../Models/apartments/events';

function ApartmentCard({ cardInfo }: ApartmentCardProps) {
	const { floor, residence, m2, price, url, year, rooms } = cardInfo;
	const meterPrice = Number(price.replace(" ", '')) / Number(m2);
	return (
		<button className={styles.root} onClick={() => setCurrentApartmentEv(cardInfo)}>
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
				<span>{meterPrice.toFixed(0)}$/м&#178;</span>
				<span>Год сдачи {year}</span>
				<span>{floor}/17 этаж</span>
			</div>
		</button>
	);
}

export default ApartmentCard;
