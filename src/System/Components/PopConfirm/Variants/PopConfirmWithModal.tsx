import { FC } from 'react';
import { PopConfirmVariantProps } from '@System/Components/PopConfirm/Variants/PopConfirmVariantProps';

type PopConfirmWithModalProps = PopConfirmVariantProps;

const PopConfirmWithModal: FC<PopConfirmWithModalProps> = ({ ...props }) => (
	<span data-testid="popconfirm-modal-wrapper" {...props}></span>
);

export default PopConfirmWithModal;
