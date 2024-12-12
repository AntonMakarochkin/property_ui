import React from 'react';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Определяет кнопку как основную
	 */
	primary?: boolean;
	accent?: boolean;
}
