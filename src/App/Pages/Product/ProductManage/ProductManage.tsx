import { history } from '@App/history';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { Link } from 'react-router-dom';

type ProductManageProps = {
	mode?: 'create' | 'update';
};

const ProductManage = ({ mode }: ProductManageProps) => (
	<Dialog
		open
		onClose={() => {
			history.push('/products');
		}}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
		data-testid="module-product-manage"
	>
		<DialogTitle id="alert-dialog-title">
			{mode === 'update' ? 'Updating' : 'Creating'}
		</DialogTitle>
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

ProductManage.defaultProps = {
	mode: 'update',
};

export default ProductManage;
