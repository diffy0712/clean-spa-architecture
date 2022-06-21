import { render } from '@testing-library/react';
import Layout from '@App/Layout/Layout';
import { act } from 'react-test-renderer';
import { history } from '@App/history';
import { sleep } from '@System/Utils/async';

describe('Layout tests', () => {
	test('Check if component renders and calls methods', async () => {
		await act(() => {
			render(<Layout />);
		});
	});

	test('Check if layout blocks rendered', () => {
		const { getByTestId } = render(<Layout />);
		expect(getByTestId('layout-navigation')).not.toBeNull();
		expect(getByTestId('layout-main-container')).not.toBeNull();
	});

	const expectNavigationToRouteRendersTestId = async (
		route: string,
		testId: string
	) => {
		const { queryByTestId } = render(<Layout />);
		expect(queryByTestId(testId)).toBeNull();
		await act(() => {
			history.push(route);
		});
		await sleep(1000);
		expect(queryByTestId(testId)).not.toBeNull();
		expect(queryByTestId(testId)).toBeVisible();
	};

	test('Can navigate to notifications page', async () => {
		expectNavigationToRouteRendersTestId(
			'/notifications',
			'page-notifications'
		);
	});

	test('Can navigate to counter page', async () => {
		expectNavigationToRouteRendersTestId('/counter', 'page-counter');
	});

	test('Can navigate to contact page', async () => {
		expectNavigationToRouteRendersTestId('/contact', 'page-contact');
	});

	test('Can navigate to contact-vm page', async () => {
		expectNavigationToRouteRendersTestId('/contact-vm', 'page-contact-vm');
	});

	test('Can navigate to product module page', async () => {
		expectNavigationToRouteRendersTestId('/products', 'module-product'); // should add the list too
	});

	test('Can navigate to campaign module page', async () => {
		expectNavigationToRouteRendersTestId('/campaigns', 'module-campaign'); // should add the list too
	});
});
