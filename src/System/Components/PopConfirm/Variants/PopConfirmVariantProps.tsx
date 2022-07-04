import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type PopConfirmVariantProps = {
	title?: string;
	content?: string;
	onCancel?: () => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
