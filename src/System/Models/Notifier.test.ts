import Notifier, { Notification } from './Notifier';

describe('Test Notifier', () => {
	test('Subscribed callback called on notify', () => {
		const notifierCallbackMock = jest.fn(() => true);
		const notification: Notification = {
			title: 'Mock notification.',
			type: 'info',
		};

		Notifier.subscribe(notifierCallbackMock);
		Notifier.notify(notification);
		expect(notifierCallbackMock).toBeCalledTimes(1);
		expect(notifierCallbackMock).toBeCalledWith(notification);
	});

	test('Unbscribed callback not called on notify', () => {
		const notifierCallbackMock = jest.fn(() => true);
		const notification: Notification = {
			title: 'Mock notification.',
			type: 'info',
		};

		Notifier.subscribe(notifierCallbackMock);
		Notifier.unsubscribe(notifierCallbackMock);
		Notifier.notify(notification);
		expect(notifierCallbackMock).toBeCalledTimes(0);
	});
});
