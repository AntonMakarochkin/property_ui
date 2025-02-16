import clsx from 'clsx';
import styles from './PageContacts.module.css';
import Header from '../../Containers/Header';
import HeaderMobile from '../../Containers/HeaderMobile';

function PageContacts() {
	return (
		<div className={clsx(styles.root)}>
			<Header /> 
			<HeaderMobile />
			<div className={styles.content}>
				<div className={styles.container}>
					<div className={styles.address}>
						<span>1-й Сетуньский пр-д, вл. 6-10, Москва, 119136</span>
					</div>
				</div>
				<div className={styles.container}>
					<div className={styles.map}>
						<iframe
							src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab6919c49b7e9f55b41af354e82ada3a4af2d7794f670485df012c3b298f5fb69&amp;source=constructor"
							width="100%"
							height="100%"
							frameBorder="0"
						></iframe>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PageContacts;
