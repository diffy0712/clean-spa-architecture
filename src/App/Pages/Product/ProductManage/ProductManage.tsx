import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { Link } from 'react-router-dom';

const ProductManage = () => (
	<Dialog
		open
		onClose={() => {
			console.log('lcose');
		}}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
	>
		<DialogTitle id="alert-dialog-title">Edit</DialogTitle>
		<DialogContent>
			<DialogContentText id="alert-dialog-description">
				EDIIIT
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Link to={'/products'}>Back to list</Link>
		</DialogActions>
	</Dialog>
);

export default ProductManage;
