import { DetailedHTMLProps, HTMLAttributes } from 'react';
import withViewModel, {
	WithViewModelProps,
} from '@System/Components/Hoc/withViewModel';
import PopConfirmViewModel, {
	PopConfirmViewModelProps,
} from '@System/Components/PopConfirm/PopConfirmViewModel';
import PopConfirmVariantFactory from '@System/Components/PopConfirm/Variants/PopConfirmVariantFactory';

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
		{viewModel.visible && viewModel.variant && (
			<PopConfirmVariantFactory
				variant={viewModel.variant}
				onCancel={viewModel.onCancel.bind(viewModel)}
			/>
		)}
	</>
);

export default withViewModel<
	PopConfirmProps,
	PopConfirmViewModel,
	PopConfirmViewModelProps
>(PopConfirm, PopConfirmViewModel, PopConfirmViewModelProps);
