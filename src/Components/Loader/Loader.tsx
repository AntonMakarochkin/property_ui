import clsx from 'clsx';

import { LoaderProps } from './types';

import styles from './Loader.module.css';

function Loader({ className, style }: LoaderProps) {
	return (
		<div
			style={style}
			className={clsx('kit_loader', styles.root, className)}
		></div>
	);
}

export default Loader;
