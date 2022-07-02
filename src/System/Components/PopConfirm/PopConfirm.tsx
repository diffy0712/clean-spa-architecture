import { DetailedHTMLProps, HTMLAttributes } from 'react';
import withViewModel, {
	WithViewModelProps,
} from '@System/Components/Hoc/withViewModel';
import PopConfirmViewModel, {
	PopConfirmViewModelProps,
} from '@System/Components/PopConfirm/PopConfirmViewModel';
import PopConfirmWithModal from '@System/Components/PopConfirm/Variants/PopConfirmWithModal';
import PopConfirmWithPopover from '@System/Components/PopConfirm/Variants/PopConfirmWithPopover';

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
		{viewModel.visible && (
			<>
				{viewModel.variant === 'modal' && <PopConfirmWithModal />}
				{viewModel.variant === 'popover' && <PopConfirmWithPopover />}
			</>
		)}
	</>
);

export default withViewModel<
	PopConfirmProps,
	PopConfirmViewModel,
	PopConfirmViewModelProps
>(PopConfirm, PopConfirmViewModel, PopConfirmViewModelProps);
