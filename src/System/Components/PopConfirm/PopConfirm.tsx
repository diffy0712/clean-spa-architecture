import {
	FC,
	DetailedHTMLProps,
	HTMLAttributes,
	useCallback,
	MouseEvent, useState, useMemo
} from "react";

export type PopConfirmProps =  {
	modal?: boolean;
	popover?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

const PopConfirm: FC<PopConfirmProps> = ({children, onClick: inputOnClick, modal, popover, ...props}) => {
	const [visible, setVisible] = useState<boolean>(false);
	const variant = useMemo(() => {
		if (modal) {
			return 'modal';
		}

		return 'popover';
	}, [modal, popover]);

	const onClick = useCallback((event: MouseEvent<HTMLSpanElement>) => {
		setVisible(true);
		inputOnClick?.(event);
	}, []);

	return (
		<>
			<span data-testid="popconfirm-wrapper" onClick={onClick} {...props}>
				{children}
			</span>
			{visible && (
				<>
					{variant === 'modal' && (
						<PopConfirmWithModal />
					)}
					{variant === 'popover' && (
						<PopConfirmWithPopover/>
					)}
				</>
			)}
		</>
	);
};

export default PopConfirm;

type PopConfirmVariantProps = {
	title?: string;
	content?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

type PopConfirmWithPopoverProps =  PopConfirmVariantProps;

const PopConfirmWithPopover: FC<PopConfirmWithPopoverProps> = ({...props}) => (
	<span data-testid="popconfirm-popover-wrapper" {...props}></span>
);

type PopConfirmWithModalProps =  PopConfirmVariantProps;

const PopConfirmWithModal: FC<PopConfirmWithModalProps> = ({...props}) => (
	<span data-testid="popconfirm-modal-wrapper" {...props}></span>
);
