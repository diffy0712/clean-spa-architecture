import { render } from '@testing-library/react';
import Contact from './Contact';

describe('Contact Page tests', () => {
	test('Can render Contact component', () => {
		render(<Contact />);
	});
});
