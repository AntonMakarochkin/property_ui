import { ResidenceCardProps } from './types';

import styles from './ResidenceCard.module.css';
import { Link } from 'react-router-dom';

function ResidenceCard({ cardInfo }: ResidenceCardProps) {
	const { name, parameters, type, isTop, image, id } = cardInfo;
	const [area, remoteness, priceFrom] = parameters;
	return (
		<div className={styles.root}>
			<Link to={`residence/${id}`} className={styles.link} />
			<div className={styles.image} style={{ backgroundImage: `url(${image}` }}>
				<span className={styles.type}>{type}</span>
				{isTop && <span className={styles.top}>Лидер продаж</span>}
			</div>
			<div className={styles.name}>{name}</div>
			<div className={styles.parameters}>
				{/* {parameters.map((parameter) => (
          <span>{parameter}</span>
        ))} */}
				<span>от {priceFrom}р</span>
				<span>от {area}м2</span>
				<span>{remoteness} до моря</span>
			</div>
		</div>
	);
}

export default ResidenceCard;
