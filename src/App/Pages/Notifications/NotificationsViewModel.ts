import Notifier, {
	Notification,
	NotificationTypes,
} from '@System/Models/Notifier';

class NotificationsViewModel {
	protected notifier = Notifier;

	init() {
		this.notifier.notify({
			title: 'View Model mounted',
			type: 'info',
		});

		setTimeout(() => {
			this.notificationMessage({
				title: 'Updates occured in our database. Refresh to see fresh results',
				type: 'info',
				important: true,
				closeable: true,
				actions: [
					{
						title: 'Refresh',
						callback: (close) => {
							console.log('refreshing...');
							close();
						},
					},
				],
			});
		}, 1000);
	}

	update() {
		this.notifier.notify({
			title: 'View Model updated',
			type: 'info',
		});
	}

	dispose() {
		this.notifier.notify({
			title: 'View Model disposed',
			type: 'info',
		});
	}

	// Buttons should have their own methods (maybe use 1-2 types)
	// I did not want to write so many functions for each options.
	//
	// Usually you have actions with much more logic.
	// You would also test if the method sent the notification
	// by checking the mocked notifier instance.
	notificationMessage(notification: Notification) {
		this.notifier.notify(notification);
	}
}

export default NotificationsViewModel;
