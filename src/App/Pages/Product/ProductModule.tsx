import FadeInOut from '../../../System/Components/Animations/FadeInOut/FadeInOut';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ProductGrid from './ProductGrid/ProductGrid';
import ProductView from './ProductView/ProductView';

const ProductModule = () => (
	<FadeInOut>
		<ProductGrid />
		<AnimatePresence exitBeforeEnter>
			<Routes>
				<Route path="/:productId" element={<ProductView />} />
			</Routes>
		</AnimatePresence>
	</FadeInOut>
);

export default ProductModule;
