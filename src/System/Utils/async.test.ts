import { sleep } from './async';
import { DateTime } from 'luxon';

describe('Async test suite', () => {
	const timeouts = [500, 600, 700];

	test.each(timeouts)(
		'Sleep sleeps correctly for $timeout ms',
		async (timeout) => {
			const before = DateTime.now();
			await sleep(timeout);
			const after = DateTime.now();

			expect(after.toMillis() - before.toMillis()).toBeGreaterThanOrEqual(
				timeout
			);
			expect(after.toMillis() - before.toMillis()).toBeLessThanOrEqual(
				timeout + 100
			);
		}
	);
});
