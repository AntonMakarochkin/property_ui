import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Хук предназначен для определения положения плавающего контейнера position absolute, без position relative
 *
 * ## Пропсы
 *
 * isEnabled: Включение/отключение расчета позиции
 *
 * Следующие пропсы нужны для решения проблемы скролла, при скролле одно из родительских элементов, попап следует прятать
 * При скролле дочернего контейнера, внутри плавающего попапа, элемент не должен прятаться
 *
 * onExternalScroll: Метод, вызывающийся при скролле одно из родительски элементов, например для закрытия попапа
 * internalScrollClassName: Имя класса контейнера, который имеет скролл и расположен внутри плавающего контейнера
 *
 * ## Возвращаемые пропсы
 *
 * position: обьект вида {top, left} для плавающего контейнера
 * parentRef: ref, который следует установить для элемента управления плавающим контейнером
 * handleFloatRectInit: метод обработчик ref, который следует установить для плавающего контейнера
 *
 * Пример использования:
 *
 * const {position,parentRef,handleFloatRectInit}=useFloatPosition(
 * 	{isEnabled:true,onExternalScroll={()=>'hidePopup',internalScrollClassName:'scrollable_popup'}}
 * )
 *
 * <div>
 * 	<button ref={parentRef}>Open</button>
 * 	<div style={position} ref={handleFloatRectInit} className='scrollable_popup'></div>
 * </div>
 *
 */

function useFloatPosition(props: {
	isEnabled: boolean;
	onExternalScroll?: () => void;
	internalScrollClassName?: string;
}) {
	const { isEnabled, onExternalScroll, internalScrollClassName = '' } = props;

	const parentRef = useRef<HTMLDivElement | null>(null);
	const [floatRect, setFloatRect] = useState<DOMRect | null>(null);

	const handleFloatRectInit = useCallback((node: HTMLDivElement) => {
		if (node) {
			setFloatRect(node.getBoundingClientRect());
		}
	}, []);

	const position = useMemo(() => {
		if (!isEnabled || !parentRef?.current) {
			return undefined;
		}

		const parentRect = parentRef.current.getBoundingClientRect();

		if (!floatRect) {
			return { top: parentRect.y + parentRect.height, left: parentRect.x };
		}

		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;

		const isOutOfWidth = parentRect.x + floatRect.width > screenWidth;
		const isOutOfHeight = parentRect.y + floatRect.height > screenHeight;

		if (isOutOfWidth && isOutOfHeight) {
			return {
				top: parentRect.y - floatRect.height,
				left: parentRect.x - (parentRect.x + floatRect.width - screenWidth),
			};
		}

		if (isOutOfWidth) {
			return {
				top: parentRect.y + parentRect.height,
				left: parentRect.x - (parentRect.x + floatRect.width - screenWidth),
			};
		}

		if (isOutOfHeight) {
			return {
				top: parentRect.y - floatRect.height,
				left: parentRect.x,
			};
		}

		return { top: parentRect.y + parentRect.height, left: parentRect.x };
	}, [floatRect, isEnabled]);

	useEffect(() => {
		const handleScroll = (event: any) => {
			const isInternalScroll =
				internalScrollClassName &&
				event.target?.className?.includes(internalScrollClassName);

			if (isInternalScroll) {
				return;
			}

			if (onExternalScroll) {
				onExternalScroll();
			}
		};

		if (isEnabled) {
			window.addEventListener('scroll', handleScroll, true);
		}

		return () => {
			window.removeEventListener('scroll', handleScroll, true);
		};
	}, [internalScrollClassName, isEnabled, onExternalScroll]);

	return { position, parentRef, handleFloatRectInit };
}

export default useFloatPosition;
