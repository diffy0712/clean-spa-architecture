import TrimDataTransformer from './TrimDataTransformer';

afterEach(() => {
	jest.resetAllMocks();
});

test('Trim To In - should Not crash on null', () => {
	expect(TrimDataTransformer.transformToIn(null)).toEqual('');
});

test('Trim To In - should Not Change', () => {
	const inValue = 'test should not  change to IN';
	expect(TrimDataTransformer.transformToIn(inValue)).toEqual(inValue);
});

test('Trim To In - should Not Change With Trailing Spaces', () => {
	const inValue = '  test should not  change to IN  ';
	expect(TrimDataTransformer.transformToIn(inValue)).toEqual(inValue);
});

test('Trim To Out - should Not crash on null', () => {
	expect(TrimDataTransformer.transformToOut(null)).toEqual('');
});

test('Trim To Out should Not Change', () => {
	const outValue = 'test should not  change to IN';

	expect(TrimDataTransformer.transformToOut(outValue)).toEqual(outValue);
});

test('Trim To In - should Change With Trailing Spaces', () => {
	const outValue = '  test should not  change to IN  ';
	expect(TrimDataTransformer.transformToOut(outValue)).toEqual(
		'test should not  change to IN  '
	);
});
