import {
	DetailedHTMLProps,
	FC,
	HTMLAttributes,
	MouseEvent,
	useCallback,
	useState,
} from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';
import ModalConfirmContent, {
	ModalConfirmContentProps,
} from '@System/Components/ModalConfirm/ModalConfirmContent';

export type ModalConfirmProps = DetailedHTMLProps<
	HTMLAttributes<HTMLElement>,
	HTMLElement
> &
	ModalConfirmContentProps;

const ModalConfirm: FC<ModalConfirmProps> = ({
	onCancel,
	children,
	onClick,
	...props
}) => {
	const [visible, setVisible] = useState<boolean>(false);
	const onWrapperClick = useCallback((event: MouseEvent<HTMLElement>) => {
		setVisible(true);
		onClick?.(event);
	}, []);

	const onCancelClick = useCallback((event: MouseEvent<HTMLElement>) => {
		setVisible(false);
		onCancel?.(event);
	}, []);

	return (
		<>
			<span data-testid="ModalConfirm-root" onClick={onWrapperClick}>
				{children}
			</span>
			<Dialog open={visible} maxWidth="xs" onClose={onCancelClick}>
				{visible && <ModalConfirmContent onCancel={onCancelClick} {...props} />}
			</Dialog>
		</>
	);
};
export default ModalConfirm;
