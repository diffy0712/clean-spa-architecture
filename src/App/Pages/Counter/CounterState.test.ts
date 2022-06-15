import CounterState from '@App/Pages/Counter/CounterState';

afterEach(() => {
	jest.resetAllMocks();
});

it('Check incrementStep and decrementStep working.', () => {
	expect(CounterState.step).toBe(1);
	CounterState.setStep(0);
	expect(CounterState.step).toBe(0);
	CounterState.setStep(1);

	CounterState.incrementStep();
	expect(CounterState.step).toBe(2);

	CounterState.incrementStep();
	expect(CounterState.step).toBe(3);

	CounterState.decrementStep();
	expect(CounterState.step).toBe(2);

	CounterState.decrementStep();
	expect(CounterState.step).toBe(1);

	CounterState.decrementStep();
	expect(CounterState.step).toBe(0);

	expect(CounterState.canDecrementStep).toBe(false);

	CounterState.decrementStep();
	expect(CounterState.step).toBe(0);

	CounterState.incrementStep();
	expect(CounterState.step).toBe(1);

	expect(CounterState.canDecrementStep).toBe(true);
});

it('Check incrementCount and decrementCount working', () => {
	expect(CounterState.count).toBe(0);
	CounterState.setCount(0);
	CounterState.setStep(1);
	expect(CounterState.step).toBe(1);

	CounterState.incrementCount();
	expect(CounterState.count).toBe(1);

	CounterState.incrementCount();
	expect(CounterState.count).toBe(2);

	CounterState.decrementCount();
	expect(CounterState.count).toBe(1);

	CounterState.decrementCount();
	expect(CounterState.count).toBe(0);

	CounterState.decrementCount();
	expect(CounterState.count).toBe(-1);

	CounterState.incrementCount();
	expect(CounterState.count).toBe(0);

	CounterState.setStep(4);
	CounterState.incrementCount();
	expect(CounterState.count).toBe(4);
	CounterState.incrementCount();
	expect(CounterState.count).toBe(8);
	CounterState.decrementCount();
	expect(CounterState.count).toBe(4);

	CounterState.setStep(10);
	CounterState.incrementCount();
	expect(CounterState.count).toBe(14);
	CounterState.decrementCount();
	expect(CounterState.count).toBe(4);
	CounterState.decrementCount();
	expect(CounterState.count).toBe(-6);
});
