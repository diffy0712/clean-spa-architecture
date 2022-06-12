import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import FadeInOut from '../../../../System/Components/Animations/FadeInOut/FadeInOut';

const rows: GridRowsProp = [
	{ id: 1, col1: 'Hello', col2: 'World' },
	{ id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
	{ id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
	{
		field: 'col1',
		headerName: 'Actions',
		width: 150,
		renderCell: (cellValues) => (
			<>
				<Link to={`/products/${cellValues.id}`}>View</Link>
				<Link to={`/products/${cellValues.id}/edit`}>Edit</Link>
			</>
		),
	},
	{ field: 'col2', headerName: 'Column 2', width: 150 },
];

const ProductGrid = () => (
	<FadeInOut>
		<Card>
			<CardContent>
				<div style={{ height: 300, width: '100%' }}>
					<DataGrid rows={rows} columns={columns} />
				</div>
			</CardContent>
		</Card>
	</FadeInOut>
);

export default ProductGrid;
