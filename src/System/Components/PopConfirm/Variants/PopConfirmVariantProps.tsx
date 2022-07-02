import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type PopConfirmVariantProps = {
	title?: string;
	content?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
