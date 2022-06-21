import { render } from '@testing-library/react';
import CampaignModule from '@App/Pages/Campaign/CampaignModule';
import { expectNavigationToRouteRendersTestId } from '@Tests/Utils/Routing.test';

describe('CampaignModule page', () => {
	test('Can render Campaign module', () => {
		render(<CampaignModule />);
	});

	test('Can navigate to campaign module page', async () => {
		expectNavigationToRouteRendersTestId('/campaigns', 'module-campaign'); // should add the list too
	});
});
