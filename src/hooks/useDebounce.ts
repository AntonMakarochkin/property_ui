import React, { useEffect, useState } from 'react';

export default function useDebounce<T>(
	delay: number,
	initialValue: T,
	debouncedHandler: (value: T | undefined) => void,
): [T | undefined, React.Dispatch<React.SetStateAction<T>>] {
	const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

	useEffect(() => {
		const handler = setTimeout(() => {
			debouncedHandler(debouncedValue);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [debouncedValue, debouncedHandler, delay]);

	return [debouncedValue, setDebouncedValue];
}
