import { useSwiper } from 'swiper/react';
import styles from './ApartmentSwiper.module.css';
import { AngleLeft, AngleRight } from '../../Components/Icons';
export function SwiperControls() {
	const swiper = useSwiper();
	return (
		<>
			<button onClick={() => swiper.slidePrev()} className={styles.prev}><AngleLeft /></button>
			<button onClick={() => swiper.slideNext()} className={styles.next}><AngleRight /></button>
		</>
	);
}
