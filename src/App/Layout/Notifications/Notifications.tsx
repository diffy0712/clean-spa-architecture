import withViewModel from '../../../System/Components/Hoc/withViewModel';
import { SnackbarProvider, withSnackbar } from 'notistack';
import NotificationsViewModel, {
	NotificationsViewModelProps,
} from './NotificationsViewModel';

const NotificationViewModel = withSnackbar(
	withViewModel<
		Record<string, unknown>,
		NotificationsViewModel,
		NotificationsViewModelProps
	>(() => null, NotificationsViewModel, NotificationsViewModelProps)
);

const NotificationWrapper = () => (
	<SnackbarProvider>
		<NotificationViewModel />
	</SnackbarProvider>
);

export default NotificationWrapper;
