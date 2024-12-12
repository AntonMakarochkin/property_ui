import React from 'react';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	caption?: string;
	outline?: boolean;
	message?: string;
}
