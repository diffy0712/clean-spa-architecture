import FadeInOut from '@System/Components/Animations/FadeInOut/FadeInOut';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ProductGrid from './ProductGrid/ProductGrid';
import ProductView from './ProductView/ProductView';
import ProductManage from './ProductManage/ProductManage';
import ProductInfo from './ProductInfo/ProductInfo';

const ProductModule = () => (
	<FadeInOut data-testid="module-product">
		<AnimatePresence exitBeforeEnter>
			<Routes>
				<Route path="/info" element={<ProductInfo />} />
				<Route path="/*" element={<ProductGrid />} />
			</Routes>
		</AnimatePresence>
		<AnimatePresence exitBeforeEnter>
			<Routes>
				<Route path="/create" element={<ProductManage />} />
				<Route path="/:productId/edit" element={<ProductManage />} />
				<Route path="/:productId/view" element={<ProductView />} />
			</Routes>
		</AnimatePresence>
	</FadeInOut>
);

export default ProductModule;
