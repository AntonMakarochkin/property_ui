import { useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { PortalProps } from './types';

function Portal({ children, wrapperId = 'portal_root' }: PortalProps) {
	const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
		null,
	);

	const createWrapperAndAppendToBody = (wrapperId: string) => {
		const element = document.createElement('div');
		element.setAttribute('id', wrapperId);
		document.body.appendChild(element);

		return element;
	};

	useLayoutEffect(() => {
		let element = document.getElementById(wrapperId);
		let systemCreated = false;

		if (!element) {
			systemCreated = true;
			element = createWrapperAndAppendToBody(wrapperId);
		}

		setWrapperElement(element);

		return () => {
			if (systemCreated && element?.parentNode) {
				element.parentNode.removeChild(element);
			}
		};
	}, [wrapperId]);

	if (wrapperElement === null) return null;

	return ReactDOM.createPortal(children, wrapperElement);
}

export default Portal;
