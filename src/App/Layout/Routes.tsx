import { Routes as RouterRoutes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import React, { ReactElement, Suspense } from 'react';
const Home = React.lazy(() => import('../Pages/Home/Home'));
const Counter = React.lazy(() => import('../Pages/Counter/Counter'));
const Contact = React.lazy(() => import('../Pages/Contact/Contact'));
const ContactVM = React.lazy(() => import('../Pages/ContactVm/ContactVM'));
const Notifications = React.lazy(
	() => import('../Pages/Notifications/Notifications')
);
const CampaignModule = React.lazy(
	() => import('../Pages/Campaign/CampaignModule')
);
const ProductModule = React.lazy(
	() => import('../Pages/Product/ProductModule')
);
import Loader from '../../System/Components/Loader/Loader';

const Routes = () => {
	const location = useLocation();
	const modules: [string, ReactElement][] = [
		['/campaigns', <CampaignModule key="campaigns" />],
		['/products', <ProductModule key="products" />],
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
			(module) => location.pathname.indexOf(module[0]) >= 0
		);
		const key = module ? module[0] : location.pathname;
		return key;
	};

	return (
		<Suspense fallback={<Loader />}>
			<AnimatePresence exitBeforeEnter>
				<RouterRoutes location={location} key={getLocationKey()}>
					<Route index element={<Home />} />
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
						<Route
							path={`${module[0]}/*`}
							element={module[1]}
							key={module[0]}
						/>
					))}
				</RouterRoutes>
			</AnimatePresence>
		</Suspense>
	);
};
export default Routes;
