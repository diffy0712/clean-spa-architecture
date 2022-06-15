import { act } from 'react-test-renderer';
import { render } from '@testing-library/react';
import Home from '@App/Pages/Home/Home';

test('Can render Home component', () => {
	act(() => {
		render(<Home />);
	});
});
