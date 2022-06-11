import withViewModel, {
	WithViewModelProps,
} from '../../../System/Components/Hoc/withViewModel';
import FadeInOut from '../../../System/Components/Animations/FadeInOut/FadeInOut';
import { HTMLMotionProps } from 'framer-motion';
import {
	Alert,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material';
import NotificationsViewModel from './NotificationsViewModel';

type NotificationsProps = HTMLMotionProps<'div'>;

const Notifications = ({
	viewModel,
	...props
}: WithViewModelProps<NotificationsViewModel> & NotificationsProps) => (
	<FadeInOut {...props}>
		<div className="w-full mb-4">
			<Typography variant="h5">Notifications</Typography>
		</div>
		<Card className="relative">
			<CardContent>
				<Alert severity="info" className="mb-4">
					An overview of notificatios usage.
				</Alert>
			</CardContent>
			<CardActions>
				<div className="grid w-full align-items-center">
					<div className="col-12">
						<Button
							variant="contained"
							size="small"
							onClick={viewModel.onMessage.bind(viewModel)}
							data-testid="test-message-button"
						>
							Test message
						</Button>
					</div>
				</div>
			</CardActions>
		</Card>
	</FadeInOut>
);

export default withViewModel<
	NotificationsProps,
	NotificationsViewModel,
	Record<string, unknown>
>(Notifications, NotificationsViewModel);
