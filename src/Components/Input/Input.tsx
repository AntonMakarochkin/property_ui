import { useId } from 'react';
import clsx from 'clsx';

import { InputProps } from './types';

import styles from './Input.module.css';

/**
 * Текстовое поле для ввода данных
 *
 * ### Атрибуты
 * Поддерживает стандартные атрибуты HTML элемента `input`
 *
 * ### Локальные свойства
 * `--input-color`: Цвет текста поля ввода
 *
 * `--input-color-placeholder`: Цвет замещающего текста
 *
 * `--input-background-color`: Цвет фона поля ввода
 *
 * `--input-border-color-hover`: Цвет рамки текстового поля при наведении
 *
 * `--input-border-color-focused`: Цвет рамки текстового поля в фокусе
 *
 * `--input-border-color`: Стандартный цвет рамки текстового поля
 *
 * `--input-border-color-disabled`: Цвет рамки отключенного поля
 *
 * `--input-background-color-disabled`: Цвет фона отключенного поля
 *
 * `--input-color-error`: Цвет текста поля ввода с ошибкой
 *
 * `--input-padding-horizontal`: Внутренний отступ справа и слева
 *
 * `--input-padding`: Внутренние отступы поля ввода
 *
 * `--input-border-style`: Стиль рамки поля ввода
 *
 * `--input-border-radius`: Радиус рамки поля ввода
 *
 * `--input-border-width`: Размер рамки поля ввода
 *
 * `--input-font-size`: Размер шрифта поля ввода
 *
 * `--caption-font-size`: Размер текста заголовка
 *
 * `--caption-require-marker-color`: Цвет маркера обязательного поля
 *
 * `--message-font-size`: Размер текста сообщения
 *
 * `--message-color`: Цвет текста сообщения
 */
function Input({
	id,
	className,
	style,
	caption,
	outline,
	message,
	...defaultInputProps
}: InputProps) {
	const usingId: string = id || useId();
	return (
		<div
			className={clsx(
				'kit_input',
				styles.root,
				className,
				outline && styles.outline,
			)}
			style={style}
		>
			<input id={usingId} {...defaultInputProps} className={styles.input} />
			{caption && (
				<label
					htmlFor={usingId}
					className={clsx(styles.caption, outline && styles.outline)}
				>
					<span className={styles.input_title}>{caption}</span>
				</label>
			)}

			{message && (
				<span className={styles.message} title={message}>
					{message}
				</span>
			)}
		</div>
	);
}

export default Input;
