import Select from '../../Components/Select';
import { SymbolDelete } from '../../Components/Icons';

import { useApartmentsFilters } from '../../Facades/useApartmentsFilters';
import styles from './ApartmentFilters.module.css';
import clsx from 'clsx';
import {
	changeOpenModalEv,
	resetFilterEv,
} from '../../Models/apartments/events';
import { useAuthorization } from '../../Facades/useAuthorization';
import { $apartments } from '../../Models/apartments/state';
import { useUnit } from 'effector-react';

function ApartmentFilters() {
	const [apartments] = useUnit([$apartments]);
	const {
		filters,
		handlerSetFilterByKey,
		handlerSetFilterRooms,
		selectResidences,
	} = useApartmentsFilters();
	const { authorizationStatus } = useAuthorization();

	const apartmentsCount = apartments.length;
	// const apartmentsCountText = apartmentsCount === 1 ? 'планировка' : 'планировки'
	return (
		<div className={styles.root}>
			<div className={styles.title}>
				<div className={styles.name} data-count={`Найдено ${apartmentsCount}`}>
					Планировки
				</div>
				<button
					className={styles.button_add}
					disabled={!authorizationStatus}
					onClick={() => changeOpenModalEv(true)}
				>
					Добавить
				</button>
			</div>
			<div className={styles.filters}>
				<Select
					label="Проект"
					onBlur={function Fl() {}}
					onChange={(item) => handlerSetFilterByKey('residence', item.id)}
					className={styles.select}
					options={[
						{
							id: '0',
							name: 'Любой',
						},
						...selectResidences,
					]}
					type="behind"
					value={filters.residence}
				/>
				<div className={styles.rooms_quantity}>
					<button
						onClick={() => handlerSetFilterRooms('студия')}
						className={clsx(styles.studio, {
							[styles.active]: filters?.rooms?.includes('студия'),
						})}
					>
						студия
					</button>
					<button
						onClick={() => handlerSetFilterRooms('1-комнатная')}
						className={clsx({
							[styles.active]: filters.rooms?.includes('1-комнатная'),
						})}
					>
						1
					</button>
					<button
						onClick={() => handlerSetFilterRooms('2-комнатная')}
						className={clsx({
							[styles.active]: filters.rooms?.includes('2-комнатная'),
						})}
					>
						2
					</button>
					<button
						onClick={() => handlerSetFilterRooms('3-комнатная')}
						className={clsx({
							[styles.active]: filters.rooms?.includes('3-комнатная'),
						})}
					>
						3
					</button>
					<button
						onClick={() => handlerSetFilterRooms('4-комнатная')}
						className={clsx({
							[styles.active]: filters.rooms?.includes('4-комнатная'),
						})}
					>
						4+
					</button>
				</div>
				<div className={styles.property_price}>
					<span>от</span>
					<input
						type="text"
						min={3}
						onChange={({ target }) =>
							handlerSetFilterByKey('priceFrom', target.value)
						}
						value={filters.priceFrom}
					/>
					<hr />
					<span>до</span>
					<input
						type="number"
						min={3}
						onChange={({ target }) =>
							handlerSetFilterByKey('priceTo', target.value)
						}
						value={filters.priceTo}
					/>
				</div>
				<div className={styles.property_area}>
					<span>от</span>
					<input
						type="text"
						min={3}
						onChange={({ target }) =>
							handlerSetFilterByKey('metersFrom', target.value)
						}
						value={filters.metersFrom}
					/>
					<hr />
					<span>до</span>
					<input
						type="number"
						min={3}
						onChange={({ target }) =>
							handlerSetFilterByKey('metersTo', target.value)
						}
						value={filters.metersTo}
					/>
				</div>
				{/* <span className={styles.total_floats}>Найдено {apartmentsCount} {apartmentsCount ? apartmentsCountText : 'планировок'}</span> */}
			</div>
			<div className={styles.filters__active}>
				{(filters.rooms?.length || filters.residence !== '0') && (
					<button
						className={styles.button_clear}
						onClick={() => resetFilterEv()}
					>
						<SymbolDelete className={styles.delete} />
					</button>
				)}
				{filters.residence !== '0' && (
					<div>
						{selectResidences.filter((item) => item.id === filters.residence)[0].name}
					</div>
				)}
				{filters.rooms?.map((item) => (
					<div>{item}</div>
				))}
			</div>
		</div>
	);
}

export default ApartmentFilters;
