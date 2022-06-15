import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import {
	Button,
	Card,
	CardContent,
	IconButton,
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import FadeInOut from '@System/Components/Animations/FadeInOut/FadeInOut';
import {
	Add,
	Delete,
	Edit,
	QuestionMark,
	Visibility,
} from '@mui/icons-material';

const rows: GridRowsProp = [
	{ id: 1, name: 'Test device' },
	{ id: 2, name: 'DataGridPro' },
	{ id: 3, name: 'MUI' },
	{ id: 4, name: 'MUI2' },
	{ id: 5, name: 'MUI3' },
	{ id: 6, name: 'MUI4' },
	{ id: 7, name: 'MUI5' },
];

const columns: GridColDef[] = [
	{ field: 'name', headerName: 'Name', flex: 5 },
	{
		field: 'id',
		type: 'actions',
		headerName: 'Actions',
		renderCell: (cellValues) => (
			<>
				<Link to={`/products/${cellValues.id}/view`}>
					<IconButton
						color="primary"
						aria-label="Product Details"
						component="span"
					>
						<Visibility />
					</IconButton>
				</Link>
				<Link to={`/products/${cellValues.id}/edit`}>
					<IconButton
						color="primary"
						aria-label="Edit Product"
						component="span"
					>
						<Edit />
					</IconButton>
				</Link>
				<IconButton color="error" aria-label="Delete Product" component="span">
					<Delete />
				</IconButton>
			</>
		),
		flex: 1,
	},
];

const ProductGrid = () => (
	<FadeInOut>
		<div className="grid mb-4">
			<div className="col-6">
				<Typography variant="h5">Products</Typography>
			</div>
			<div className="col-6 text-right">
				<Link to="/products/info">
					<IconButton
						aria-label="About Products"
						component="span"
						className="mr-4"
					>
						<QuestionMark />
					</IconButton>
				</Link>
				<Link to="/products/create">
					<Button variant="contained" startIcon={<Add />}>
						Add Product
					</Button>
				</Link>
			</div>
		</div>
		<Card>
			<CardContent className="m-0 p-0">
				<div style={{ height: 500, width: '100%' }}>
					<DataGrid rows={rows} columns={columns} />
				</div>
			</CardContent>
		</Card>
	</FadeInOut>
);

export default ProductGrid;
