import styles from './Card.module.css';
import Img from '../../assets/image.png';
function Card() {
	return (
		<div className={styles.root}>
			<div className={styles.title}>
				<span>JOIS</span>
				<span className={styles.build}>Athens</span>
			</div>
			<img src={Img} alt="" />
			<div className={styles.price}>
				<span>2-комнатая, 65.5м&#178;</span>
				<mark>450 630 $</mark>
			</div>
			<div className={styles.info}>
				<span>7650$/м&#178;</span>
				<span>Сдан</span>
				<span>14/17 этаж</span>
			</div>
		</div>
	);
}

export default Card;
