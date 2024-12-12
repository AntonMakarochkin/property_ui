import React, { ReactNode } from 'react';
export interface SelectOption {
	id: string;
	name: string;
	disabled?: boolean;
	renderFn?: (value?: renderFnValueProps) => ReactNode;
}
export interface renderFnValueProps extends Omit<SelectOption, 'renderFn'> {}

export type SelectType = 'contained' | 'behind' | 'outlined';

export interface SelectCommonProps {
	options: SelectOption[];
	onChange: (value: SelectOption) => void;
	label?: string;
	key?: string;
	// loading?: boolean;
	disabled?: boolean;
	required?: boolean;
	requiredText?: string;
	showRequiredText?: boolean;
	placeholder?: string;
	type?: SelectType;
	value?: string;
	className?: string;
	style?: React.CSSProperties;
	name?: string;
	onBlur?: (value: SelectOption | null) => void;
}
