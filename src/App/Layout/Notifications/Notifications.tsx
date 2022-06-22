import withViewModel from '@System/Components/Hoc/withViewModel';
import { SnackbarProvider, withSnackbar } from 'notistack';
import NotificationsViewModel, {
	NotificationsViewModelProps,
} from '@App/Layout/Notifications/NotificationsViewModel';
import { Slide } from '@mui/material';

const NotificationViewModel = withSnackbar(
	withViewModel<
		Record<string, unknown>,
		NotificationsViewModel,
		NotificationsViewModelProps
	>(() => null, NotificationsViewModel, NotificationsViewModelProps)
);

const Notifications = () => (
	<SnackbarProvider
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		TransitionComponent={Slide}
		maxSnack={6}
	>
		<NotificationViewModel />
	</SnackbarProvider>
);

export default Notifications;
