import { act } from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';
import Counter from '@App/Pages/Counter/Counter';
import CounterState from '@App/Pages/Counter/CounterState';
import { expectNavigationToRouteRendersTestId } from '@Tests/Utils/Routing.test';

const decrementStepMock = jest.spyOn(CounterState, 'decrementStep');
const incrementStepMock = jest.spyOn(CounterState, 'incrementStep');
const incrementCountMock = jest.spyOn(CounterState, 'incrementCount');
const decrementCountMock = jest.spyOn(CounterState, 'decrementCount');

describe('<Counter> Page tests', () => {
	test('Can navigate to counter page', async () => {
		expectNavigationToRouteRendersTestId('/counter', 'page-counter');
	});

	afterEach(() => {
		jest.resetAllMocks();
		CounterState.setCount(0);
		CounterState.setStep(1);
	});

	test('Check if component renders and calls methods', () => {
		act(() => {
			render(<Counter />);
		});
		expect(CounterState.step).toBe(1);
		expect(CounterState.count).toBe(0);

		const incrementStepButton = screen.getByTestId('incrementStep');
		fireEvent.click(incrementStepButton);
		expect(incrementStepMock).toBeCalledTimes(1);

		const decrementStepButton = screen.getByTestId('decrementStep');
		fireEvent.click(decrementStepButton);
		expect(decrementStepMock).toBeCalledTimes(1);

		const incrementCountButton = screen.getByTestId('incrementCount');
		fireEvent.click(incrementCountButton);
		expect(incrementCountMock).toBeCalledTimes(1);

		const decrementCountButton = screen.getByTestId('decrementCount');
		fireEvent.click(decrementCountButton);
		expect(decrementCountMock).toBeCalledTimes(1);
	});

	test('Step can only be positive integer.', () => {
		act(() => {
			render(<Counter />);
		});

		const decrementStepButton = screen.getByTestId('decrementStep');
		act(() => {
			fireEvent.click(decrementStepButton);
		});
		expect(decrementStepMock).toBeCalledTimes(1);

		act(() => {
			CounterState.setStep(0);
		});
		fireEvent.click(decrementStepButton);
		expect(decrementStepMock).toBeCalledTimes(1);
	});
});
