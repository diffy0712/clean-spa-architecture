import { fireEvent, render } from '@testing-library/react';
import { ChangeEvent } from 'react';
import { sleep } from '../../../Utils/async';
import Checkbox from './Checkbox';

describe('Checkbox test suite', () => {
	test('Can render Checkbox component', async () => {
		render(<Checkbox />);
	});

	test('Changing checkbox state calls onChange', async () => {
		const onChangeMock = jest.fn(
			(eventOrValue: boolean | ChangeEvent<HTMLInputElement>) => {
				if (typeof eventOrValue === 'boolean') {
					expect(typeof eventOrValue).toEqual('boolean');
					return;
				}
				expect(eventOrValue.target.checked).toEqual(false);
			}
		);
		const dom = render(
			<Checkbox data-testid="checkbox" value={true} onChange={onChangeMock} />
		);

		const checkbox = dom.getByTestId('checkbox').querySelector('input');
		fireEvent.click(checkbox!);
		expect(onChangeMock).toBeCalledTimes(1);
	});

	test('Checkbox displays errors', async () => {
		const onChangeMock = jest.fn(() => true);
		const dom = render(
			<Checkbox
				errors={['Test error', 'Test error2']}
				value={true}
				onChange={onChangeMock}
			/>
		);

		const errors = dom.getByTestId('checkbox-errors').querySelectorAll('span');
		expect(errors).toHaveLength(2);
	});

	test('Checkbox displays errors on touchError', async () => {
		const onChangeMock = jest.fn(() => true);
		const dom = render(
			<Checkbox
				touchErrors
				errors={['Test error']}
				value={true}
				onChange={onChangeMock}
			/>
		);

		expect(dom.queryByTestId('checkbox-errors')).toBeNull();
	});
});
