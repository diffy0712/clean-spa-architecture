import {
	FC,
	DetailedHTMLProps,
	HTMLAttributes,
	useCallback,
	MouseEvent, useState
} from "react";

export type PopConfirmProps =  {
	modal?: boolean;
	popover?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

const PopConfirm: FC<PopConfirmProps> = ({children, onClick: inputOnClick, modal, popover, ...props}) => {
	const [visible, setVisible] = useState<boolean>(false);

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
					{modal && (
						<PopConfirmWithModal />
					)}
					{popover && !modal && (
						<PopConfirmWithPopover/>
					)}
				</>
			)}
		</>
	);
};

PopConfirm.defaultProps = {
	modal: false,
	popover: true,
}

export default PopConfirm;

type PopConfirmWithPopoverProps =  DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

const PopConfirmWithPopover: FC<PopConfirmWithPopoverProps> = ({...props}) => (
	<span data-testid="popconfirm-popover-wrapper" {...props}></span>
);

type PopConfirmWithModalProps =  DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

const PopConfirmWithModal: FC<PopConfirmWithModalProps> = ({...props}) => (
	<span data-testid="popconfirm-modal-wrapper" {...props}></span>
);
