import { render } from '@testing-library/react';
import { expectNavigationToRouteRendersTestId } from '@Tests/Utils/Routing.test';
import Home from './Home';

describe('Home page', () => {
	test('Can render Home component', () => {
		render(<Home />);
	});
	test('Can navigate to home page', async () => {
		expectNavigationToRouteRendersTestId('/', 'page-home');
	});
});
