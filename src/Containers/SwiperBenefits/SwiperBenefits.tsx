import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperControls } from './SwiperButtons';
import { useResidences } from '../../Facades/useResidences';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './SwiperBenefits.module.css';

function SwiperBenefits() {
	const { currentResidence } = useResidences();
	const { categories } = currentResidence;
	return (
		<Swiper
			className={styles.swiper}
			spaceBetween={50}
			slidesPerView={4}
			// loop={true}
			// onSlideChange={() => console.log('slide change')}
			// onSwiper={(swiper) => console.log(swiper)}
		>
			{categories.map((category) => (
				<SwiperSlide>
					<button className={styles.slide}>
						<div className={styles.img_container}>
							<img src={category.url} />
						</div>
						<span className={styles.name}>{category.name}</span>
					</button>
				</SwiperSlide>
			))}
			<SwiperControls />
		</Swiper>
	);
}

export default SwiperBenefits;
