import { fireEvent, render } from '@testing-library/react';
import Notifications from '@App/Pages/Notifications/Notifications';
import NotificationsViewModel from '@App/Pages/Notifications/NotificationsViewModel';
import { expectNavigationToRouteRendersTestId } from '@Tests/Utils/Routing.test';

describe('Notifications Page tests', () => {
	test('Can render Notifications component', () => {
		render(<Notifications />);
	});

	test('Can navigate to notifications page', async () => {
		expectNavigationToRouteRendersTestId(
			'/notifications',
			'page-notifications'
		);
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
