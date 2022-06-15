import { render } from '@testing-library/react';
import ContactVM from '@App/Pages/ContactVm/ContactVM';

describe('ContactVM Page tests', () => {
	test('Can render ContactVM component', () => {
		render(<ContactVM />);
	});
});
