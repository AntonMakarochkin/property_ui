import { useState } from 'react';
import Input from '../../Components/Input';

import styles from './Consultation.module.css';
import { ChangeFieldProps, ConsultationFormFields } from './types';
import { CONSULTATION_FORM_EXISTED_FIELDS } from '../../Shared/constants';
import clsx from 'clsx';

function Consultation() {
	const [fields, setFields] = useState<ConsultationFormFields>({});
	const [errors, setErrors] = useState<string[]>([]);
	const showErrorMessage = errors.length > 0;
	// const activeFields = getActiveFormFields<ConsultationFormFields>(fields);

	function onSubmitForm() {
		setErrors(
			CONSULTATION_FORM_EXISTED_FIELDS.map((key) => {
				if (!fields[key]) {
					return key;
				}
				return null;
			}).filter((item) => item !== null) as string[],
		);
	}

	function handlerChangeInput(event: ChangeFieldProps) {
		const { target } = event;
		const { name, value } = target;
		if (errors.includes(name)) {
			setErrors(errors.filter((item) => item !== name));
		}
		setFields({ ...fields, [name]: value });
	}

	return (
		<div className={styles.root}>
			<div className={styles.information}>
				<div className={styles.description}>
					<span> Сделаем бесплатный подбор недвижимости</span>
					<span>Расскажите, что ищете. Мы подберем подходящии варианты</span>
				</div>
				<div className={styles.contacts}>
					<span>
						Оставьте заявку на консультацию или звоните по телефону:
						<mark> +7 925 007 007 0</mark>
					</span>
				</div>
			</div>
			<div className={styles.form}>
				<Input
					placeholder="Имя"
					name="name"
					onChange={handlerChangeInput}
					outline
					value={fields.name}
					className={clsx(styles.input, {
						[styles.validate_error]: errors.includes('name'),
					})}
					autoComplete="off"
					type=""
				/>
				<textarea
					name="comment"
					className={clsx(styles.textarea, {
						[styles.validate_error]: errors.includes('comment'),
					})}
					onChange={handlerChangeInput}
					value={fields.comment}
					placeholder="Комментарий"
				/>
				<button className={styles.button_submit} onClick={() => onSubmitForm()}>
					Получить консультацию
				</button>
				<Input
					name="phone"
					placeholder="Телефон: 7(999)000-00-00"
					onChange={handlerChangeInput}
					outline
					value={fields.phone}
					className={clsx(styles.input, {
						[styles.validate_error]: errors.includes('phone'),
					})}
					autoComplete="off"
				/>
				{showErrorMessage && (
					<div className={styles.error_message}>Необходимо заполнить все поля</div>
				)}
			</div>
		</div>
	);
}

export default Consultation;
