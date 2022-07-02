import { FC } from 'react';
import { PopConfirmVariantProps } from '@System/Components/PopConfirm/Variants/PopConfirmVariantProps';

type PopConfirmWithPopoverProps = PopConfirmVariantProps;

const PopConfirmWithPopover: FC<PopConfirmWithPopoverProps> = ({
	...props
}) => <span data-testid="popconfirm-popover-wrapper" {...props}></span>;

export default PopConfirmWithPopover;
