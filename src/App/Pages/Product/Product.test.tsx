import { expectNavigationToRouteRendersTestId } from '@Tests/Utils/Routing.test';

describe('ProductModule tests', () => {
	test('Can navigate to product module page', async () => {
		expectNavigationToRouteRendersTestId('/products', 'module-product'); // should add the list too
	});
});
