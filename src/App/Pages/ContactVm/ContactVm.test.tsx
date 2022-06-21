import { render } from '@testing-library/react';
import ContactVM from '@App/Pages/ContactVm/ContactVM';
import { expectNavigationToRouteRendersTestId } from '@Tests/Utils/Routing.test';

describe('ContactVM Page tests', () => {
	test('Can render ContactVM component', () => {
		render(<ContactVM />);
	});

	test('Can navigate to contact-vm page', async () => {
		expectNavigationToRouteRendersTestId('/contact-vm', 'page-contact-vm');
	});
});
