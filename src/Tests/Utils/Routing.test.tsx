import { sleep } from '@System/Utils/async';
import { render } from '@testing-library/react';
import Layout from '@App/Layout/Layout';
import { act } from 'react-test-renderer';
import { history } from '@App/history';

export const expectNavigationToRouteRendersTestId = async (
	route: string,
	testId: string
) => {
	const { queryByTestId, debug } = render(<Layout />);
	expect(queryByTestId(testId)).toBeNull();
	await act(() => {
		history.push(route);
	});
	await sleep(1000);
	debug();
	expect(queryByTestId(testId)).not.toBeNull();
	expect(queryByTestId(testId)).toBeVisible();
};
