import withViewModel from '@System/Components/Hoc/withViewModel';
import { SnackbarProvider, withSnackbar } from 'notistack';
import NotificationsViewModel, {
	NotificationsViewModelProps,
} from '@App/Layout/Notifications/NotificationsViewModel';
import { Slide } from '@mui/material';
import NotificationActions from '@App/Layout/Notifications/NotificationActions';

const NotificationViewModel = withSnackbar(
	withViewModel<
		Record<string, unknown>,
		NotificationsViewModel,
		NotificationsViewModelProps
	>(
		({ viewModel }) => {
			viewModel.setActionsComponent(NotificationActions);
			return null;
		},
		NotificationsViewModel,
		NotificationsViewModelProps
	)
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
