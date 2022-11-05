import { FC, MouseEvent } from 'react';
import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';

export type ModalConfirmContentProps = {
	title?: string;
	content?: string;
	onCancel?: (event: MouseEvent<HTMLElement>) => void;
	onConfirm?: (event: MouseEvent<HTMLElement>) => void;
};

const ModalConfirmContent: FC<ModalConfirmContentProps> = ({
	title,
	content,
	onCancel,
	onConfirm,
}) => (
	<>
		<DialogTitle>{title}</DialogTitle>
		<DialogContent dividers>{content}</DialogContent>
		<DialogActions>
			<Button autoFocus onClick={onCancel}>
				Cancels
			</Button>
			<Button onClick={onConfirm}>Ok</Button>
		</DialogActions>
	</>
);

export default ModalConfirmContent;
