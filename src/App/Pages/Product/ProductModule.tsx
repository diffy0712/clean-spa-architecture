import FadeInOut from '../../../System/Components/Animations/FadeInOut/FadeInOut';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ProductGrid from './ProductGrid/ProductGrid';
import ProductView from './ProductView/ProductView';
import ProductManage from './ProductManage/ProductManage';

const ProductModule = () => (
	<FadeInOut>
		<ProductGrid />
		<AnimatePresence exitBeforeEnter>
			<Routes>
				<Route path="/:productId/edit" element={<ProductManage />} />
				<Route path="/:productId" element={<ProductView />} />
			</Routes>
		</AnimatePresence>
	</FadeInOut>
);

export default ProductModule;
