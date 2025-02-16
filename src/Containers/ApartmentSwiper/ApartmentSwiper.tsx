import Modal from '../../Components/Modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperControls } from './SwiperButtons';
import styles from './ApartmentSwiper.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { $currentApartment } from '../../Models/apartments/state';
import { useUnit } from 'effector-react';
import { resetCurrentApartmentEv } from '../../Models/apartments/events';
import { Pagination } from 'swiper/modules';
import { Apartment } from '../../Models/apartments/types';
function ApartmentSwiper() {
	const [currentApartment] = useUnit([$currentApartment]);
	const { floor = '', price, residence, rooms, year, m2, photos } =
		currentApartment as Apartment;
	const isOpen = currentApartment?.id ? true : false;
	const plan = rooms === 'Студия' ? 'Студия' : `${rooms} квартира`;
	const title = `Продается ${plan} в ${residence}`;
	return (
		<Modal
			className={styles.modal}
			isOpen={isOpen}
			onClose={() => resetCurrentApartmentEv()}
			title={title}
			// renderControls={() => {
			// 	return (
			// 		<div className={styles.controls}>
			// 			<button onClick={() => {}} className={styles.button_cancel}>
			// 				Отмена
			// 			</button>
			// 			<button
			// 				onClick={() => {}}
			// 				// disabled={disabledSave}
			// 				className={styles.button_save}
			// 			>
			// 				Сохранить
			// 			</button>
			// 		</div>
			// 	);
			// }}
		>
			<>
        <div className={styles.params}>
            <div>Этаж: <mark>{floor}</mark></div>
            <hr className={styles.separator}/>
            <div>Цена: <mark>{price}$</mark></div>
            <hr className={styles.separator}/>
            <div>Площадь: <mark>{m2}м²</mark></div>
            <hr className={styles.separator}/>
            <div>Год сдачи: <mark>{year}</mark></div>
        </div>
				<Swiper
					pagination={true}
					modules={[Pagination]}
					className={styles.swiper}
					spaceBetween={0}
					slidesPerView={1}
					loop={true}
					// onSlideChange={() => console.log('slide change')}
					// onSwiper={(swiper) => console.log(swiper)}
				>
					{photos?.map((photo) => (
						<SwiperSlide
							className={styles.slide}
							style={{ backgroundImage: `url(${photo.url}` }}
						/>
					))}
					<SwiperControls />
				</Swiper>
			</>
		</Modal>
	);
}

export default ApartmentSwiper;
