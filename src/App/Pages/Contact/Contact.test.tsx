import { render } from '@testing-library/react';
import Contact from '@App/Pages/Contact/Contact';
import { expectNavigationToRouteRendersTestId } from '@Tests/Utils/Routing.test';

describe('Contact Page tests', () => {
	test('Can render Contact component', () => {
		render(<Contact />);
	});

	test('Can navigate to contact page', async () => {
		expectNavigationToRouteRendersTestId('/contact', 'page-contact');
	});
});
