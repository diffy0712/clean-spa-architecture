import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Modal,
} from '@mui/material';
import { Link } from 'react-router-dom';
import FadeInOut from '../../../../System/Components/Animations/FadeInOut/FadeInOut';

const ProductView = () => (
	<Dialog
		open
		onClose={() => {
			console.log('lcose');
		}}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
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
