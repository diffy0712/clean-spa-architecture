import { SnackbarKey, useSnackbar } from 'notistack';
import { NotificationAction } from '@System/Models/Notifier';
import { Button, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

export type NotificationActionsProps = {
	snackbarId: SnackbarKey;
	actions: NotificationAction[];
	closeable?: boolean;
};

const NotificationActions = ({
	snackbarId,
	closeable,
	actions,
}: NotificationActionsProps) => {
	const { closeSnackbar } = useSnackbar();

	return (
		<>
			{actions.map((action) => (
				<Button
					variant="outlined"
					onClick={() => action.callback(() => closeSnackbar(snackbarId))}
					size="small"
					key={action.title}
					color="inherit"
					className="mr-2"
				>
					{action.title}
				</Button>
			))}
			{closeable && (
				<IconButton
					aria-label="About Products"
					onClick={() => {
						closeSnackbar(snackbarId);
					}}
				>
					<Close />
				</IconButton>
			)}
		</>
	);
};

NotificationActions.defaultProps = {
	closeable: true,
};

export default NotificationActions;
