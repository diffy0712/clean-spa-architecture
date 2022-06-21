import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '@System/Components/FormControl/Input/Input';
import { sleep } from '@System/Utils/async';
import { act } from 'react-test-renderer';

describe('Input test suite', () => {
	test('Can render Input component', async () => {
		const inputOnChangeMock = jest.fn(
			(eventOrValue: React.ChangeEvent<HTMLInputElement> | string) => {
				expect(
					typeof eventOrValue !== 'string' ? eventOrValue?.target.value : ''
				).toEqual('testt');
			}
		);
		const { getByTestId } = render(
			<Input
				data-testid="testInput"
				value="test"
				onChange={inputOnChangeMock}
			/>
		);

		const inputElement = getByTestId('testInput').querySelector(
			'input'
		) as HTMLInputElement;
		expect(inputElement.value).toEqual('test');

		await userEvent.type(inputElement, 't');
		await sleep(200);
		expect(inputOnChangeMock).toBeCalledTimes(1);
	});

	test('Render Input component with label', async () => {
		const inputOnChangeMock = jest.fn(() => true);
		const { queryByText, queryByTestId } = render(
			<Input
				value="test"
				data-testid="testInput"
				label="Input Mock Test Label"
				onChange={inputOnChangeMock}
			/>
		);

		await sleep(50);
		expect(queryByTestId('testInput-label')).not.toBeNull();
		expect(queryByText('Input Mock Test Label')).not.toBeNull();
	});

	test('Render Input component without label', async () => {
		const inputOnChangeMock = jest.fn(() => true);
		const { queryByTestId } = render(
			<Input
				value="test"
				data-testid="testInput"
				onChange={inputOnChangeMock}
			/>
		);

		await sleep(50);
		expect(queryByTestId('testInput-label')).toBeNull();
	});

	test('Render Input component with errors and touchError', async () => {
		const inputOnChangeMock = jest.fn(() => true);
		const { queryByText, queryByTestId, getByTestId } = render(
			<Input
				value="test"
				data-testid="testInput"
				onChange={inputOnChangeMock}
				errors={['Error1', 'Error2']}
			/>
		);

		await sleep(50);
		expect(queryByTestId('testInput-errors')).toBeNull();
		expect(queryByText('Error1')).toBeNull();
		expect(queryByText('Error2')).toBeNull();

		const inputElement = getByTestId('testInput').querySelector(
			'input'
		) as HTMLInputElement;

		await act(() => {
			inputElement.focus();
			inputElement.blur();
		});

		expect(queryByTestId('testInput-errors')).not.toBeNull();
		expect(queryByText('Error1')).not.toBeNull();
		expect(queryByText('Error2')).not.toBeNull();
	});

	test('Render Input component with errors and touchError disabled', async () => {
		const inputOnChangeMock = jest.fn(() => true);
		const { queryByText, queryByTestId, getByTestId, debug } = render(
			<Input
				value="test"
				data-testid="testInput"
				onChange={inputOnChangeMock}
				errors={['Error1', 'Error2']}
				touchErrors={false}
			/>
		);

		await sleep(50);
		expect(queryByTestId('testInput-errors')).not.toBeNull();
		expect(queryByText('Error1')).not.toBeNull();
		expect(queryByText('Error2')).not.toBeNull();
	});

	test('Render Input component without errors', async () => {
		const inputOnChangeMock = jest.fn(() => true);
		const { queryByTestId } = render(
			<Input
				value="test"
				data-testid="testInput"
				onChange={inputOnChangeMock}
				errors={[]}
				touchErrors={false}
			/>
		);

		expect(queryByTestId('testInput-errors')).toBeNull();
	});

	test('Render Input component can use onBlur prop (as it is overriden by Input)', async () => {
		const inputOnChangeMock = jest.fn(() => true);
		const onBlurMock = jest.fn(() => true);
		const { getByTestId } = render(
			<Input
				value="test"
				onChange={inputOnChangeMock}
				data-testid="testInput"
				onBlur={onBlurMock}
			/>
		);

		const inputElement = getByTestId('testInput').querySelector(
			'input'
		) as HTMLInputElement;
		await act(() => {
			inputElement.focus();
			inputElement.blur();
		});

		expect(onBlurMock).toBeCalledTimes(1);
	});
});
