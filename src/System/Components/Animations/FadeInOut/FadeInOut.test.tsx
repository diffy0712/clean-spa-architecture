import { sleep } from '@System/Utils/async';
import { render } from '@testing-library/react';
import { AnimatePresence } from 'framer-motion';
import FadeInOut from './FadeInOut';

describe('FadeInOut test suite', () => {
	test('Can render FadeInOut component', async () => {
		const { getByTestId } = render(
			<FadeInOut>
				<div data-testid="testDiv">test</div>
			</FadeInOut>
		);

		expect(getByTestId('testDiv')).not.toBeNull();
	});
	test('Can render multiple FadeInOut component with delay', async () => {
		const { getByTestId } = render(
			<>
				<AnimatePresence>
					<FadeInOut key="test1">
						<div data-testid="testDiv">test</div>
					</FadeInOut>
					<FadeInOut delay={2} key="test2">
						<div data-testid="testDiv2">test2</div>
					</FadeInOut>
				</AnimatePresence>
			</>
		);
		await sleep(200);
		expect(getByTestId('testDiv')).toBeVisible();
		expect(getByTestId('testDiv2')).not.toBeVisible();
		await sleep(100);
		expect(getByTestId('testDiv')).toBeVisible();
		expect(getByTestId('testDiv2')).toBeVisible();
	});
});
