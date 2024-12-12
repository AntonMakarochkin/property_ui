import React, { ForwardRefRenderFunction } from 'react';
import clsx from 'clsx';

import { ButtonProps } from './types';

import styles from './Button.module.css';

/**
 * Основной UI компонент для взаимодействия с пользователем.
 *
 * ### Глобальные стили
 * Компонент использует следующие глобальные свойства:
 *
 * `--accent-color` — по умолчанию `#fab82e` основной цвет,
 * используется корпоративный цвет по умолчанию.
 *
 * `--accent-hover-color` — по умолчанию `#fda610` основной цвет который
 * используется при наведении.
 *
 * `--accent-disable-color` — по умолчанию `#fee5ba` основной цвет
 * используется для отключенного состояния.
 *
 * `--text-color` — по умолчанию `#000000` основной цвет для текста
 *
 * `--text-disable-color` — по умолчанию `#bfbfbf` цвет текста для
 * отключенного состояния.
 *
 * > **Важно!** Данные свойства используются для изменения стилей **всех** элементов
 * интерфейса внутри блока. Для изменения стилей конкретной кнопки, лучше использовать
 * локальные свойства.
 *
 * ### Локальные свойства
 * Для изменения базового стиля кнопки используются стандартные свойства.
 * Для изменения стилей **primary** кнопки используются следующие свойства:
 *
 * `--primary-background-color` — по умолчанию `--accent-color` фон кнопки
 *
 * `--primary-background-color-hover` — по умолчанию `--accent-hover-color`
 * фон кнопки при наведении
 *
 * `--primary-background-color-disabled` — по умолчанию `--accent-disable-color`
 * фон отключенной кнопки
 *
 * `--primary-border-color` — по умолчанию `--primary-background-color`
 * цвет border кнопки
 *
 * `--primary-border-color-hover` — по умолчанию `--primary-background-color-hover`
 * цвет border кнопки при наведении
 *
 * `--primary-border-color-disabled` — по умолчанию `--primary-background-color-disabled`
 * цвет border отключенной кнопки
 *
 * ### Анимация
 * Для плавного перехода от одного цвета к другому для `background-color`, `border-color`
 * задано свойство `transition` длительностью **90ms**.
 */

function Button(
	{ className, children, primary, accent, ...props }: ButtonProps,
	ref: React.RefObject<HTMLButtonElement>,
) {
	return (
		<button
			{...props}
			className={clsx(
				`kit_button`,
				styles.root,
				primary && styles.primary,
				accent && styles.accent,
				className,
			)}
			data-testid="kit_button"
			ref={ref}
		>
			{children}
		</button>
	);
}

export default React.forwardRef(
	Button as ForwardRefRenderFunction<HTMLButtonElement, ButtonProps>,
);
