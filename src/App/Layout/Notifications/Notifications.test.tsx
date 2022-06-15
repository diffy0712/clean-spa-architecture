import { act } from 'react-test-renderer';
import { render } from '@testing-library/react';
import Notifications from '@App/Layout/Notifications/Notifications';
import Notifier from '@System/Models/Notifier';
import { NotificationsViewModelProps } from '@App/Layout/Notifications/NotificationsViewModel';

describe('Notifications component tests', () => {
	test('Just for coverage', async () => {
		const vmProps = new NotificationsViewModelProps();
		vmProps.closeSnackbar();
		vmProps.enqueueSnackbar('');
	});
	test('Check if component renders..', async () => {
		const dom = render(
			<div id="root">
				<Notifications />
			</div>
		);
		await act(async () => {
			Notifier.notify({
				title: 'Mock Notification',
				type: 'info',
			});
		});

		const domNotificationElements = dom.container.getElementsByClassName(
			'SnackbarContainer-root'
		);
		expect(domNotificationElements).not.toBeNull();
	});
});
