import { MouseEvent, useCallback, useRef, useState } from 'react';

type Coordinates = {
	left?: string;
	right?: string;
	top?: string;
	bottom?: string;
};

function usePopupCoordinates() {
	const popupRef = useRef<HTMLElement>(null!);

	const [inputCoords, setInputCoords] = useState({
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	});

	const [popupCoords, setPopupCoords] = useState<Coordinates>({});

	const handleCoordsReset = () => {
		setInputCoords({
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
		});
	};

	const handleInputCoordsSet = <T extends HTMLElement>(e: MouseEvent<T>) => {
		const node = e.target as T;
		const rect = node.getBoundingClientRect();

		setInputCoords({
			bottom: rect.bottom,
			left: rect.left,
			right: rect.right,
			top: rect.top,
		});
	};

	const handlePopupRefChange = useCallback(
		<T extends HTMLElement>(node: T | null) => {
			if (node) {
				popupRef.current = node;

				const { clientHeight: popupHeight, clientWidth: popupWidth } = node;

				const {
					innerHeight: windowHeight,
					innerWidth: windowWidth,
					scrollX,
					scrollY,
				} = window;

				setPopupCoords(() => {
					let top = '';
					let bottom = '';
					let left = '';
					let right = '';

					if (windowWidth - inputCoords.left < popupWidth) {
						right = `${windowWidth + scrollX - inputCoords.right}px`;
					} else {
						left = `${inputCoords.left}px`;
					}

					if (windowHeight - inputCoords.bottom < popupHeight) {
						top = `${scrollY + inputCoords.top - popupHeight}px`;
					} else {
						top = `${inputCoords.bottom + scrollY}px`;
					}

					return { left, top, bottom, right };
				});
			}
		},
		[inputCoords],
	);

	return {
		popupCoords,
		popupWidth: inputCoords.right - inputCoords.left,
		popupRef,
		handleInputCoordsSet,
		handlePopupRefChange,
		handleCoordsReset,
	};
}

export default usePopupCoordinates;
