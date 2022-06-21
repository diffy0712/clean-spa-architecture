import { Button, Typography, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import FadeInOut from '@System/Components/Animations/FadeInOut/FadeInOut';
import { ChevronLeft } from '@mui/icons-material';

const ProductInfo = () => (
	<FadeInOut data-testid="module-product-info">
		<div className="grid mb-4">
			<div className="col-6">
				<Typography variant="h5">About Products</Typography>
			</div>
			<div className="col-6 text-right">
				<Button
					variant="contained"
					component={Link}
					to="/products"
					startIcon={<ChevronLeft />}
				>
					Back To Products
				</Button>
			</div>
		</div>
		<Alert severity="info">Products are noice.</Alert>
	</FadeInOut>
);

export default ProductInfo;
