import { CSSProperties, ReactNode } from 'react';

export interface ModalProps {
	title?: string;
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	style?: CSSProperties;
	className?: string;
	renderControls?: ({ onClose }: { onClose?: () => void }) => ReactNode;
}
