import { act } from 'react-test-renderer';
import { render } from '@testing-library/react';
import ProductModule from './ProductModule';

test('Can render ProductModule component', () => {
	act(() => {
		render(<ProductModule />);
	});
});
