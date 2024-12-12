import Input from '../../Components/Input';
import Modal from '../../Components/Modal';
import styles from './FormResidenceAdd.module.css';
import {
	changeResidenceFormEv,
	changeOpenModalEv,
	changeStepEv,
	resetFormFieldsEv,
} from '../../Models/residences/events';
import { useResidencesForm } from '../../Facades/useResidencesForm';
import { Category, ModalTitle } from './types';
import { useState } from 'react';
import { SymbolDelete } from '../../Components/Icons';
import {
	CATEGORY_FORM_FIELDS_COUNT,
	CATEGORY_INITIAL_STATE,
	RESIDENCE_FORM_FIELDS_COUNT,
} from '../../Shared/constants';
import Select from '../../Components/Select';
import { getActiveFilters } from '../../Shared/utils/getActiveFilters';

function FormResidenceAdd() {
	const { fields, step, open, handlerSaveResidences } = useResidencesForm();
	const [category, setCategory] = useState<Category>(CATEGORY_INITIAL_STATE);
	const disabledSave =
		Object.keys(getActiveFilters(fields)).length > RESIDENCE_FORM_FIELDS_COUNT;
	const disabledAddCategory =
		Object.values(category).filter((value) => value).length <
		CATEGORY_FORM_FIELDS_COUNT;
	console.log(disabledAddCategory, Object.keys(category.picture).length);

	function handlerAddCategory() {
		changeResidenceFormEv({
			key: 'categories',
			value: [...fields.categories, category],
		});
		setCategory(CATEGORY_INITIAL_STATE);
	}
	// console.log(disabledSave, getActiveFilters(fields), Object.keys(getActiveFilters(fields)).length);
	return (
		<Modal
			className={styles.modal}
			isOpen={open}
			onClose={() => changeOpenModalEv(false)}
			title={ModalTitle[step]}
			renderControls={() => {
				return (
					<div className={styles.controls}>
						{step === 0 && (
							<button onClick={() => resetFormFieldsEv()}>Отмена</button>
						)}
						{step !== 0 && (
							<button onClick={() => changeStepEv(step - 1)}>Назад</button>
						)}
						{step === 1 && (
							<button
								onClick={handlerSaveResidences}
								className={styles.button_save}
								disabled={disabledSave}
							>
								Сохранить
							</button>
						)}
						{step !== 1 && (
							<button onClick={() => changeStepEv(step + 1)}>Далее</button>
						)}
					</div>
				);
			}}
		>
			<div className={styles.root}>
				<div className={styles.step_number}>Шаг {step + 1} из 2</div>
				{step === 0 && (
					<>
						<Input
							placeholder="Название"
							onChange={({ target }) =>
								changeResidenceFormEv({ key: 'name', value: target.value })
							}
							outline
							value={fields.name}
							className={styles.input}
							autoComplete="off"
							// onBlur={({ target }) => handlerCheckInput(target.value, "email")}
							// message={isErrors.email ? "Обязательное поле" : undefined}
						/>
						<textarea
							value={fields.description}
							className={styles.textarea}
							autoComplete="off"
							onChange={({ target }) =>
								changeResidenceFormEv({
									key: 'description',
									value: target.value,
								})
							}
							placeholder="Описание"
						/>

						<div className={styles.file}>
							<span>Фотографии: </span>
							<input
								type="file"
								id="image-list"
								multiple
								accept="image/*"
								onChange={({ target }) =>
									changeResidenceFormEv({ key: 'gallery', value: target.files })
								}
							/>
							<label htmlFor="image-list" className={styles.file_label}>
								Выбрать
							</label>
							{fields.gallery &&
								Object.values(fields.gallery)?.map((photo: any) => (
									<span key={photo.name}>{photo.name}</span>
								))}
						</div>
						<div className={styles.double_column}>
							<Input
								placeholder="Цена (от) $"
								onChange={({ target }) =>
									changeResidenceFormEv({
										key: 'priceFrom',
										value: target.value,
									})
								}
								outline
								value={fields.priceFrom}
								className={styles.input}
								autoComplete="off"
								// onBlur={({ target }) => handlerCheckInput(target.value, "email")}
								// message={isErrors.email ? "Обязательное поле" : undefined}
							/>
							<Input
								placeholder="Площадь (от)"
								onChange={({ target }) =>
									changeResidenceFormEv({ key: 'area', value: target.value })
								}
								outline
								value={fields.area}
								className={styles.input}
								autoComplete="off"
								// onBlur={({ target }) => handlerCheckInput(target.value, "email")}
								// message={isErrors.email ? "Обязательное поле" : undefined}
							/>
						</div>
						<Input
							placeholder="До моря мин."
							onChange={({ target }) =>
								changeResidenceFormEv({
									key: 'remoteness',
									value: target.value,
								})
							}
							outline
							value={fields.remoteness}
							className={styles.input}
							autoComplete="off"
							// onBlur={({ target }) => handlerCheckInput(target.value, "email")}
							// message={isErrors.email ? "Обязательное поле" : undefined}
						/>
						<Select
							label="Тип ЖК"
							onBlur={function Fl() {}}
							onChange={({ id }) =>
								changeResidenceFormEv({ key: 'type', value: id })
							}
							className={styles.select_rooms}
							options={[
								{
									id: 'Бизнес-класс',
									name: 'Бизнес-класс',
								},
								{
									id: 'Комфорт класс',
									name: 'Комфорт класс',
								},
							]}
							type="behind"
							value={fields.type}
						/>
					</>
				)}
				{step === 1 && (
					<>
						<Input
							placeholder="Категория"
							onChange={({ target }) =>
								setCategory({ ...category, name: target.value })
							}
							outline
							value={category.name}
							className={styles.input}
							autoComplete="off"
							// onBlur={({ target }) => handlerCheckInput(target.value, "email")}
							// message={isErrors.email ? "Обязательное поле" : undefined}
						/>
						<textarea
							value={category.description}
							className={styles.textarea}
							autoComplete="off"
							onChange={({ target }) =>
								setCategory({ ...category, description: target.value })
							}
							placeholder="Описание"
						/>

						<div className={styles.file}>
							<span>Картинка: </span>
							<input
								type="file"
								id="image-plan"
								accept="image/*"
								onChange={({ target }) =>
									setCategory({ ...category, picture: target.files })
								}
							/>
							<label htmlFor="image-plan" className={styles.file_label}>
								Выбрать
							</label>
							{category?.picture && <span>{category?.picture[0]?.name}</span>}
						</div>
						<button
							className={styles.button_add}
							onClick={handlerAddCategory}
							disabled={disabledAddCategory}
						>
							Добавить
						</button>
						<div className={styles.categories}>
							{fields?.categories?.map((categoryItem: Category) => (
								<div className={styles.card}>
									<button
										className={styles.button_delete}
										onClick={() =>
											changeResidenceFormEv({
												key: 'categories',
												value: [
													...fields.categories.filter(
														(filterItem: Category) =>
															filterItem.name !== categoryItem.name,
													),
												],
											})
										}
									>
										<SymbolDelete />
									</button>
									<span title={categoryItem.name} className={styles.title}>
										{categoryItem.name}
									</span>
									<div className={styles.categories_description}>
										{categoryItem.description}
									</div>
									<span title={categoryItem?.picture[0]?.name}>
										{categoryItem?.picture[0]?.name}
									</span>
								</div>
							))}
						</div>
					</>
				)}
			</div>
		</Modal>
	);
}

export default FormResidenceAdd;
