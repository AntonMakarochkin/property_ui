import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { useOnClickOutside } from '../../hooks'; 
import { renderFnValueProps } from '../../Shared/Types/SelectCommonProps';
import { AngleDown } from '../Icons';

import { Option, SelectProps } from './types';

import styles from './Select.module.css';

/**
 * UI компонент единичного выбора
 *
 * ## Атрибуты
 *
 * `label` - `string` заголовок компонента
 *
 * `options` - `[ { id: string, name: string, renderFn: ReactNode } ]` список элементов, доступных для выбора, renderFn: Метод для кастомной отрисовки элементов выпадающего списка
 *
 * `type` - `behind | outlined | contained` тип внешнего вида
 *
 * `key` - `string` ключ, для избежания дублирования key в React
 *
 * `value` - `id` выбранного элемента
 *
 * `showRequiredText` - `boolean` Переключает отображение `requiredText` в низу селектора
 *
 * `requiredText` - `string` Текст, который будет выведен внизу селектора при `required` && `showRequiredText`
 *
 * `placeholder` - `string` Подсказка при отсутствии выбранного значения
 *
 * `disabled` - `boolean` Блокирует доступ и изменение поля формы
 *
 * `required` - `boolean` Помечает поле обязательным для заполнения
 *
 * `onChange` - `func() коллбек при выборе элемента`
 *
 * `onBlur` - `func() коллбек при blur`
 *
 * ## Локальные свойства
 *
 * ### Root
 *
 *	 `--root-width` ширина блока
 *
 *   `--root-height` высота блока
 *
 *   `--root-font-size` ращмер шрифта
 *
 *   `--root-font-weight` толщина шрифта
 *
 * ### Root Colors
 *
 *   `--root-border-color` цвет border
 *
 *   `--root-icon-fill-color` цвет иконки
 *
 *   `--root-hover-border-color` цвет border при наведении
 *
 *   `--root-focus-border-color` цвет border при взаимодействии с элементом
 *
 *   `--placeholder-color` цвет подсказки
 *
 * ### Disabled
 *
 *   `--root-disabled-border-color` disabled цвет border
 *
 *   `--root-disabled-hover-border-color` disabled цвет border при наведении
 *
 *   `--root-disabled-background-color` disabled цвет фона *
 *
 * ### Options
 *
 *   `--option-background-color` цвет фона опции
 *
 *   `--option-color` цвет шрифта опции
 *
 *   `--option-hover-background-color` цвет фона опции при наведении
 *
 *   `--option-selected-background-color` цвет фона выбранной опции
 *
 * ### Label
 *
 *   `--label-background-color` цвет фона заголовка
 *
 *   `--label-color` цвет шрифта заголовка
 *
 * ### Required text *
 *
 *   `--requred-text-color` цвет шрифта ошибок
 *
 */

function optionRenderFn({ name }: renderFnValueProps) {
	return name;
}

export default function Select({
	label,
	options,
	type = 'behind',
	key = '',
	value = '',
	requiredText = 'Поле обязательно для заполнения',
	// loading = false,
	placeholder = 'Выберите значение',
	showRequiredText,
	disabled,
	required,
	className,
	style,
	name,
	onChange = () => {},
	onBlur = () => {},
}: SelectProps) {
	const ref = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [usedValue, setUsedValue] = useState<Option | null>(
		options.find(({ id }) => id === value) || null,
	);

	useEffect(() => {
		setUsedValue(options.find(({ id }) => id === value) || null);
	}, [options, value]);

	const [isRequresToInput, setRequresToInput] = useState(false);
	// console.log('Select', usedValue, required, isRequresToInput);
	const handleBlur = () => {
		// console.log('Select', 'blur');
		if (required && !usedValue) {
			setRequresToInput(true);
		} else {
			setRequresToInput(false);
		}
		onBlur(usedValue);
	};

	const handleOptionClick = (value: Option) => {
		setIsOpen(false);
		setRequresToInput(false);
		setUsedValue(value);
		onChange(value);
	};
	const handleOpenMenu = () => setIsOpen(!isOpen);

	useOnClickOutside(ref, () => setIsOpen(false));
	return (
		<div
			ref={ref}
			className={clsx('kit_select', styles.root, className)}
			style={style}
			role="combobox"
			aria-haspopup="listbox"
			aria-expanded={isOpen}
			aria-owns="select-options"
			aria-labelledby="select-label"
			aria-controls="select-options"
		>
			<label
				className={clsx(styles.label, {
					[styles.label_outlined]: type === 'outlined',
					[styles.label_contained]: type === 'contained',
					[styles.label_disabled]: disabled,
				})}
				id="select-label"
			>
				<span>{label}</span>
				{required && <span className={styles.required_mark}>*</span>}
			</label>
			<button
				disabled={disabled}
				className={clsx(styles.button, {
					[styles.required_field]: isRequresToInput && required,
				})}
				onClick={handleOpenMenu}
				onBlur={handleBlur}
				aria-haspopup="true"
				aria-expanded={isOpen}
				aria-labelledby="select-label"
				name={name}
			>
				{usedValue ? (
					<span className={styles.value}>
						{usedValue.renderFn ? usedValue.renderFn() : usedValue.name}
					</span>
				) : (
					<span className={styles.placeholder}>{placeholder}</span>
				)}
				<div className={clsx(styles.arrow, isOpen && styles.arrow_open)}>
					<AngleDown className={styles.icon} />
				</div>
			</button>

			{isOpen && (
				<div className={styles.options}>
					{options.map((option) => {
						const { renderFn = optionRenderFn, name, id, disabled } = option;
						return (
							<button
								key={`${key}-${option.id}`}
								onClick={() => handleOptionClick(option)}
								className={clsx(styles.option__button, {
									[styles.selected]: option.id === usedValue?.id,
								})}
								role="option"
								disabled={option.disabled}
								aria-selected={option.id === usedValue?.id}
							>
								{renderFn({ name, id, disabled })}
							</button>
						);
					})}
				</div>
			)}
			{!isRequresToInput ||
				(showRequiredText && (
					<span className={styles.required_text}>{requiredText}</span>
				))}
		</div>
	);
}
