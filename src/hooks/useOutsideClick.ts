import React, { useCallback, useEffect } from 'react';

function useOutsideClick<T extends HTMLElement>(
	refs: React.RefObject<T>[],
	callback: (event: MouseEvent | TouchEvent) => void,
): void {
	const handleClickOutside = useCallback(
		(event: MouseEvent | TouchEvent) => {
			const isOutsideClicked = refs.every(
				(ref) => ref.current && !ref.current.contains(event.target as Node),
			);

			if (isOutsideClicked) {
				callback(event);
			}
		},
		[refs, callback],
	);

	useEffect(() => {
		function handleClick(event: MouseEvent | TouchEvent) {
			handleClickOutside(event);
		}

		document.addEventListener('mousedown', handleClick);
		document.addEventListener('touchstart', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
			document.removeEventListener('touchstart', handleClick);
		};
	}, [handleClickOutside]);
}

export default useOutsideClick;
