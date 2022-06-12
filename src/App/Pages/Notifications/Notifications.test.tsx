import { fireEvent, render } from '@testing-library/react';
import Notifications from './Notifications';
import NotificationsViewModel from './NotificationsViewModel';

describe('Notifications Page tests', () => {
	test('Can render Notifications component', () => {
		render(<Notifications />);
	});

	test('Clicking button calls method', () => {
		const onMessageMock = jest.spyOn(
			NotificationsViewModel.prototype,
			'onMessage'
		);

		const dom = render(<Notifications />);
		const testMessageButton = dom.getByTestId('test-message-button');
		fireEvent.click(testMessageButton);

		expect(onMessageMock).toBeCalledTimes(1);
	});
});