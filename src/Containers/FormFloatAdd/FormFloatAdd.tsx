import Input from '../../Components/Input';
import Modal from '../../Components/Modal';
import styles from './FormFloatAdd.module.css';
import Select from '../../Components/Select';
import { useUnit } from 'effector-react';
import {
	changeApartmentsFormEv,
} from '../../Models/apartments/events';
import { $modalOpen } from '../../Models/apartments/state';
import { useApartmentsForm } from '../../Facades/useApartmentsForm';
import { APARTMENT_FORM_FIELDS_COUNT, APARTMENT_FORM_EXISTED_FIELDS } from '../../Shared/constants';
import { useApartmentsFilters } from '../../Facades/useApartmentsFilters';

function FormFloatAdd() {
	const { fields, handlerSaveApartment, onCloseModal } = useApartmentsForm();
	const {
		selectResidences,
	} = useApartmentsFilters();
	const [isOpen] = useUnit([$modalOpen]);
	const disabledSave = APARTMENT_FORM_EXISTED_FIELDS.map((key) => {
		if (!fields[key]) {
			return null;
		}
		return key;
	}).filter((item) => item !== null).length < APARTMENT_FORM_FIELDS_COUNT;
	return (
		<Modal
			className={styles.modal}
			isOpen={isOpen}
			onClose={() => onCloseModal()}
			title="Добавить квартиру в каталог"
			renderControls={() => {
				return (
					<div className={styles.controls}>
						<button onClick={() => onCloseModal()} className={styles.button_cancel}>Отмена</button>
						<button
							onClick={() => handlerSaveApartment()}
							disabled={disabledSave}
							className={styles.button_save}
						>
							Сохранить
						</button>
					</div>
				);
			}}
		>
			<div className={styles.root}>
				<Select
					label="ЖК"
					onBlur={function Fl() {}}
					onChange={({ id }) =>
						changeApartmentsFormEv({ key: 'residence', value: id })
					}
					className={styles.select}
					options={selectResidences}
					type="behind"
					value={fields.residence}
				/>
				<Input
					placeholder="Корпус"
					onChange={({ target }) =>
						changeApartmentsFormEv({ key: 'flat', value: target.value })
					}
					outline
					value={fields.flat}
					className={styles.input}
					autoComplete="off"
					// onBlur={({ target }) => handlerCheckInput(target.value, "email")}
					// message={isErrors.email ? "Обязательное поле" : undefined}
				/>
				<Input
					placeholder="Этаж"
					onChange={({ target }) =>
						changeApartmentsFormEv({ key: 'floor', value: target.value })
					}
					outline
					value={fields.floor}
					className={styles.input}
					autoComplete="off"
					// onBlur={({ target }) => handlerCheckInput(target.value, "email")}
					// message={isErrors.email ? "Обязательное поле" : undefined}
				/>
				<Input
					placeholder="m&#178;"
					onChange={({ target }) =>
						changeApartmentsFormEv({ key: 'm2', value: target.value })
					}
					outline
					value={fields.m2}
					className={styles.input}
					autoComplete="off"
					// onBlur={({ target }) => handlerCheckInput(target.value, "email")}
					// message={isErrors.email ? "Обязательное поле" : undefined}
				/>
				<Input
					placeholder="Цена"
					onChange={({ target }) =>
						changeApartmentsFormEv({ key: 'price', value: target.value })
					}
					outline
					value={fields.price}
					className={styles.input}
					autoComplete="off"
					// onBlur={({ target }) => handlerCheckInput(target.value, "email")}
					// message={isErrors.email ? "Обязательное поле" : undefined}
				/>
				<Input
					placeholder="Год сдачи"
					onChange={({ target }) =>
						changeApartmentsFormEv({ key: 'year', value: target.value })
					}
					outline
					value={fields.year}
					className={styles.input}
					autoComplete="off"
					type="number"
					// onBlur={({ target }) => handlerCheckInput(target.value, "email")}
					// message={isErrors.email ? "Обязательное поле" : undefined}
				/>
				<Select
					label="Кол-во комнат"
					onBlur={function Fl() {}}
					onChange={({ id }) =>
						changeApartmentsFormEv({ key: 'rooms', value: id })
					}
					className={styles.select_rooms}
					options={[
						{
							id: 'студия',
							name: 'студия',
						},
						{
							id: '1-комнатная',
							name: '1-комнатная',
						},
						{
							id: '2-комнатная',
							name: '2-комнатная',
						},
						{
							id: '3-комнатная',
							name: '3-комнатная',
						},
						{
							id: '4-комнатная',
							name: '4-комнатная',
						},
					]}
					type="behind"
					value={fields.rooms}
				/>
				<div className={styles.file}>
					<span>План квартиры: </span>
					<input
						type="file"
						id="image-plan"
						accept="image/*"
						onChange={({ target }) =>
							changeApartmentsFormEv({ key: 'plan', value: target.files })
						}
					/>
					<label htmlFor="image-plan" className={styles.file_label}>
						Выбрать
					</label>
					{fields?.plan && <span>{fields?.plan[0]?.name}</span>}
				</div>
				<div className={styles.file}>
					<span>Фотографии: </span>
					<input
						type="file"
						id="image-list"
						multiple
						accept="image/*"
						onChange={({ target }) =>
							changeApartmentsFormEv({ key: 'photos', value: target.files })
						}
					/>
					<label htmlFor="image-list" className={styles.file_label}>
						Выбрать
					</label>
					{fields.photos &&
						Object.values(fields.photos).map((photo: any) => (
							<span key={photo.name}>{photo.name}</span>
						))}
				</div>
			</div>
		</Modal>
	);
}

export default FormFloatAdd;
