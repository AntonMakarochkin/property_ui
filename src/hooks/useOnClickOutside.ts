import React, { useCallback, useEffect } from 'react';

function useOnClickOutside<T extends HTMLElement>(
	ref: React.RefObject<T>,
	callback: (event: MouseEvent | TouchEvent) => void,
): void {
	const handleClickOutside = useCallback(
		(event: MouseEvent | TouchEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback(event);
			}
		},
		[ref, callback],
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

export default useOnClickOutside;
