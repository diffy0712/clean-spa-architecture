import { Routes as RouterRoutes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ReactElement } from 'react';
import Home from '../Pages/Home/Home';
import Counter from '../Pages/Counter/Counter';
import Contact from '../Pages/Contact/Contact';
import ContactVM from '../Pages/ContactVm/ContactVM';
import CampaignModule from '../Pages/Campaign/CampaignModule';
import Notifications from '../Pages/Notifications/Notifications';

const Routes = () => {
	const location = useLocation();
	const modules: [string, ReactElement][] = [
		['/campaigns', <CampaignModule key="campaigns" />],
	];

	// With the location.pathname defined as key, when navigating between
	// sub routes, the change will rerender (reroute) the whole tree.
	// By narrowing the location key, to be only the modules, main route
	// the navigation between sub routes of the same group, will only rerender (reroute)
	// inside the sub route branch.
	//
	// Using animations this problem is visible. Just return the location.pathname as key :)
	const getLocationKey = () => {
		const module = modules.find(
			(module) => location.pathname.indexOf(module[0]) > 0
		);
		return module ? module[0] : location.pathname;
	};

	return (
		<AnimatePresence exitBeforeEnter>
			<RouterRoutes location={location} key={getLocationKey()}>
				<Route path="/" element={<Home />} />
				<Route path="/counter" element={<Counter />} />
				<Route path="/contact" element={<Contact />} />
				<Route
					path="/contact-vm"
					element={
						<ContactVM
							fancy
							onChange={(value) => {
								console.log(value);
							}}
						/>
					}
				/>
				<Route path="/notifications" element={<Notifications />} />
				{modules.map((module) => (
					<Route path={`${module[0]}/*`} element={module[1]} key={module[0]} />
				))}
			</RouterRoutes>
		</AnimatePresence>
	);
};
export default Routes;
