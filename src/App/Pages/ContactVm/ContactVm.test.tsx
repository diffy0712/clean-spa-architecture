import { render } from '@testing-library/react';
import ContactVM from './ContactVM';

describe('ContactVM Page tests', () => {
	test('Can render ContactVM component', () => {
		render(<ContactVM />);
	});
});
