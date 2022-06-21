import { render } from '@testing-library/react';
import Layout from '@App/Layout/Layout';
import { act } from 'react-test-renderer';

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
});
