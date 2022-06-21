import { history } from '@App/history';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { Link } from 'react-router-dom';

const ProductView = () => (
	<Dialog
		open
		onClose={() => {
			history.push('/products');
		}}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
		data-testid="module-product-view"
	>
		<DialogTitle id="alert-dialog-title">View</DialogTitle>
		<DialogContent>
			<DialogContentText id="alert-dialog-description">
				Let Google help apps determine location. This means sending anonymous
				location data to Google, even when no apps are running.
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Link to={'/products'}>Back to list</Link>
		</DialogActions>
	</Dialog>
);

export default ProductView;
