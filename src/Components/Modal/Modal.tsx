import { useRef } from 'react';
import clsx from 'clsx';

// import { useOnClickOutside } from '../../hooks'; 
import { SymbolDelete } from '../Icons';
import Portal from '../Portal';

import { ModalProps } from './types';

import styles from './Modal.module.css';

/**
 * UI компонент модального окна
 *
 * ## Атрибуты
 *
 * `title` - Заголовок. При наличии будет отображена кнопка принудительного закрытия модального окна
 *
 * `isOpen` - bool состояния отображения компонента
 *
 * `onClose` - callback при принудительном закрытии модального окна
 *
 * `renderControls` - рендер-функция компонентов управления, которые отображаются через сепаратор после children
 *
 * ## Локальные свойства
 *
 * `--root-background-color` - Задний фон модального окна
 *
 * `--root-font-color` - цвет шрифта
 *
 * `--root-icon-fill` - цвет кнопок
 *
 * `--root-icon-fill-hover` цвет кнопок при наведении
 */

function Modal({
	children,
	title,
	isOpen,
	onClose,
	style,
	className,
	renderControls,
}: ModalProps) {
	const refModal = useRef<HTMLDivElement | null>(null);

	// useOnClickOutside([refModal], () => onClose());

	return isOpen ? (
		<Portal>
			<div className={clsx(styles.overlay)}>
				<div
					className={clsx('kit_modal', styles.root, className)}
					ref={refModal}
					aria-modal
					role="dialog"
					style={style}
				>
					{title && (
						<>
							<header className={styles.header}>
								<h2 id="modal-title" className={styles.title}>
									{title}
								</h2>
								<button
									onClick={onClose}
									className={styles.close_button}
									aria-label="Close"
								>
									<SymbolDelete />
								</button>
							</header>
							<hr className={styles.separator} />
						</>
					)}
					<main id="modal-content">{children}</main>
					{renderControls && (
						<footer>
							<hr className={styles.separator} />
							{renderControls({ onClose })}
						</footer>
					)}
				</div>
			</div>
		</Portal>
	) : null;
}

export default Modal;
