import { DetailedHTMLProps, HTMLAttributes } from 'react';
import withViewModel, {
	WithViewModelProps,
} from '@System/Components/Hoc/withViewModel';
import PopConfirmViewModel, {
	PopConfirmViewModelProps,
} from '@System/Components/PopConfirm/PopConfirmViewModel';
import PopConfirmWithModal from '@System/Components/PopConfirm/Variants/PopConfirmWithModal';
import PopConfirmWithPopover from '@System/Components/PopConfirm/Variants/PopConfirmWithPopover';
import { AnimatePresence } from 'framer-motion';

export type PopConfirmProps = Omit<
	DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
	'onClick'
>;

const PopConfirm = ({
	viewModel,
	children,
	...props
}: WithViewModelProps<PopConfirmViewModel> & PopConfirmProps) => (
	<>
		<span
			data-testid="popconfirm-wrapper"
			onClick={viewModel.onWrapperClick.bind(viewModel)}
			{...props}
		>
			{children}
		</span>
		<AnimatePresence exitBeforeEnter>
			{viewModel.visible && (
				<>
					{viewModel.variant === 'modal' && (
						<PopConfirmWithModal
							onCancel={viewModel.onCancel.bind(viewModel)}
						/>
					)}
					{viewModel.variant === 'popover' && <PopConfirmWithPopover />}
				</>
			)}
		</AnimatePresence>
	</>
);

export default withViewModel<
	PopConfirmProps,
	PopConfirmViewModel,
	PopConfirmViewModelProps
>(PopConfirm, PopConfirmViewModel, PopConfirmViewModelProps);
