import { Link } from 'react-router-dom';
import FadeInOut from '@System/Components/Animations/FadeInOut/FadeInOut';

const ProductInfo = () => (
	<FadeInOut>
		INFO
		<Link to={'/products'}>Back to list</Link>
	</FadeInOut>
);

export default ProductInfo;
