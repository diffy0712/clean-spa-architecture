import useInstance from './useInstance';
import { fireEvent, render } from '@testing-library/react';
import { FC, useState } from 'react';

class TestInstance {
	constructor() {
		console.log('constructor');
	}

	update() {
		console.log('update');
	}

	dispose() {
		console.log('dispose');
	}
}

const TestComponent: FC = () => {
	const [count, setCount] = useState<number>(0);
	useInstance(TestInstance, {});

	return (
		<>
			<span data-testid="count-span">{count}</span>
			<button data-testid="count-increment" onClick={() => setCount(count + 1)}>
				+
			</button>
			<button data-testid="count-decrement" onClick={() => setCount(count - 1)}>
				-
			</button>
		</>
	);
};

describe('UseInstance hook test', () => {
	let textSpan: HTMLSpanElement;
	let incrementButton: HTMLButtonElement;

	const constructorMock = jest.spyOn(console, 'log');

	let container: ReturnType<typeof render>;

	beforeEach(() => {
		container = render(<TestComponent />);

		textSpan = container.getByTestId('count-span') as HTMLSpanElement;
		incrementButton = container.getByTestId(
			'count-increment'
		) as HTMLButtonElement;
	});

	test('Test Component instance constructor called on mount', () => {
		expect(constructorMock).toBeCalledWith('constructor');
		expect(textSpan.innerHTML).toEqual('0');
	});

	test('Test Component instance update called on rerender', async () => {
		constructorMock.mockClear();
		expect(textSpan.innerHTML).toEqual('0');
		fireEvent.click(incrementButton);
		expect(textSpan.innerHTML).toEqual('1');
		expect(constructorMock).toBeCalledWith('update');
	});

	test('Test Component instance dispose called on unmount', async () => {
		constructorMock.mockClear();
		expect(textSpan.innerHTML).toEqual('0');
		container.unmount();
		expect(constructorMock).toBeCalledWith('dispose');
	});
});
