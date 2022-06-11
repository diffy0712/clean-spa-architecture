import withViewModel from '../../../System/Components/Hoc/withViewModel';
import { SnackbarProvider, withSnackbar } from 'notistack';
import NotificationsViewModel, {
	NotificationsViewModelProps,
} from './NotificationsViewModel';
import { Slide } from '@mui/material';

const NotificationViewModel = withSnackbar(
	withViewModel<
		Record<string, unknown>,
		NotificationsViewModel,
		NotificationsViewModelProps
	>(() => null, NotificationsViewModel, NotificationsViewModelProps)
);

const NotificationWrapper = () => (
	<SnackbarProvider
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		TransitionComponent={Slide}
	>
		<NotificationViewModel />
	</SnackbarProvider>
);

export default NotificationWrapper;
