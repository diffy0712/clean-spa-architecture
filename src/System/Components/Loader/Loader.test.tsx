import { act } from 'react-test-renderer';
import { render } from '@testing-library/react';
import Loader from './Loader';

test('Can render Loader component', () => {
	act(() => {
		render(<Loader />);
	});
});
