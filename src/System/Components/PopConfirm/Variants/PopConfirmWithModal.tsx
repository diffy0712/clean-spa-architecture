import { FC } from 'react';
import { PopConfirmVariantProps } from '@System/Components/PopConfirm/Variants/PopConfirmVariantProps';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';

type PopConfirmWithModalProps = PopConfirmVariantProps;

const PopConfirmWithModal: FC<PopConfirmWithModalProps> = ({
	onCancel,
	...props
}) => (
	<span data-testid="popconfirm-modal-wrapper" {...props}>
		<Dialog open={true} maxWidth="xs" onClose={() => onCancel?.()}>
			<DialogTitle>Phone Ringtone</DialogTitle>
			<DialogContent dividers>test</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={() => onCancel?.()}>
					Cancel
				</Button>
				<Button>Ok</Button>
			</DialogActions>
		</Dialog>
	</span>
);
export default PopConfirmWithModal;
