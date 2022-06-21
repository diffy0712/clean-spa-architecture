import {
	OptionsObject,
	ProviderContext,
	SnackbarKey,
	SnackbarMessage,
} from 'notistack';
import Notifier, { Notification } from '@System/Models/Notifier';

export class NotificationsViewModelProps implements ProviderContext {
	enqueueSnackbar: (
		message: SnackbarMessage,
		options?: OptionsObject | undefined
	) => SnackbarKey = () => '';
	closeSnackbar: (key?: SnackbarKey | undefined) => void = () => '';
}

class NotificationsViewModel {
	protected props: NotificationsViewModelProps;

	protected notifier = Notifier;

	constructor(props?: NotificationsViewModelProps) {
		this.props = props!;
		Notifier.subscribe(this.notify.bind(this));
	}

	dispose() {
		Notifier.unsubscribe(this.notify.bind(this));
	}

	notify(notification: Notification) {
		this.props.enqueueSnackbar(notification.title, {
			variant: notification.type,
		});
	}
}

export default NotificationsViewModel;
