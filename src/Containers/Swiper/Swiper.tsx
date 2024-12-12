import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Swiper.module.css';
import { SwiperControls } from './SwiperButtons';
import { useResidences } from '../../Facades/useResidences';

function SwiperContainer() {
	const { currentResidence } = useResidences();
	const { gallery } = currentResidence;
	return (
		<Swiper
			className={styles.swiper}
			spaceBetween={50}
			slidesPerView={1}
			loop={true}
			// onSlideChange={() => console.log('slide change')}
			// onSwiper={(swiper) => console.log(swiper)}
		>
			{gallery.map((image) => (
				<SwiperSlide className={styles.slide} style={{ backgroundImage: `url(${image.url}` }} />
			))}
      <SwiperControls />
		</Swiper>
	);
}

export default SwiperContainer;
