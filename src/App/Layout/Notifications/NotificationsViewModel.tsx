import {
	OptionsObject,
	ProviderContext,
	SnackbarKey,
	SnackbarMessage,
} from 'notistack';
import Notifier, { Notification } from '@System/Models/Notifier';
import React, { ElementType } from 'react';
import { NotificationActionsProps } from '@App/Layout/Notifications/NotificationActions';

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

	protected _actionsCallback?: ElementType<NotificationActionsProps>;

	constructor(props?: NotificationsViewModelProps) {
		this.props = props!;
		Notifier.subscribe(this.notify.bind(this));
	}

	dispose() {
		Notifier.unsubscribe(this.notify.bind(this));
	}

	setActionsComponent(component: ElementType<NotificationActionsProps>) {
		this._actionsCallback = component;
	}

	notify(notification: Notification) {
		this.props.enqueueSnackbar(notification.title, {
			variant: notification.type || 'default',
			persist: notification.important || false,
			action: (snackbarId) => {
				const Actions = this._actionsCallback;
				if (!Actions) {
					return null;
				}
				return (
					<Actions
						snackbarId={snackbarId}
						actions={notification.actions || []}
						closeable={notification.closeable}
					/>
				);
			},
		});
	}
}

export default NotificationsViewModel;
