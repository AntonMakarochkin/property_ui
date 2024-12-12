import { useSwiper } from 'swiper/react';
import styles from './Swiper.module.css';
import { AngleLeft, AngleRight } from '../../Components/Icons';
export function SwiperControls() {
	const swiper = useSwiper();
	return (
		<div className={styles.controls}>
			<button onClick={() => swiper.slidePrev()}><AngleLeft /></button>
			<button onClick={() => swiper.slideNext()}><AngleRight /></button>
		</div>
	);
}
