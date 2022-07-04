import { FC } from 'react';
import PopConfirmWithModal from '@System/Components/PopConfirm/Variants/PopConfirmWithModal';
import PopConfirmWithPopover from '@System/Components/PopConfirm/Variants/PopConfirmWithPopover';
import { PopConfirmVariantProps } from '@System/Components/PopConfirm/Variants/PopConfirmVariantProps';

export type PopConfirmVariants = 'modal' | 'popover';

type PopConfirmVariantFactoryProps = {
	variant: PopConfirmVariants;
} & PopConfirmVariantProps;

const PopConfirmVariantFactory: FC<PopConfirmVariantFactoryProps> = ({
	variant,
	...props
}) => (
	<>
		{variant === 'modal' && <PopConfirmWithModal {...props} />}
		{variant === 'popover' && <PopConfirmWithPopover {...props} />}
	</>
);

export default PopConfirmVariantFactory;
