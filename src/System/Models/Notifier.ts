type NotifierCallback = (notification: Notification) => void;

export type NotificationTypes = 'success' | 'warning' | 'error' | 'info';

export type Notification = {
	type: NotificationTypes;
	title: string;
};

class Notifier {
	subscribers: NotifierCallback[] = [];

	notify(notification: Notification): void {
		this.subscribers.forEach((subscriber) => {
			subscriber(notification);
		});
	}

	subscribe(subscriber: NotifierCallback) {
		this.subscribers.push(subscriber);
	}

	unsubscribe(subscriber: NotifierCallback) {
		const index = this.subscribers.indexOf(subscriber);
		if (index > -1) {
			this.subscribers.splice(index, 1);
		}
	}
}

export default new Notifier();
