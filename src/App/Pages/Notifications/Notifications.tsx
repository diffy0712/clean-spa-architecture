import withViewModel, {
	WithViewModelProps,
} from '@System/Components/Hoc/withViewModel';
import FadeInOut from '@System/Components/Animations/FadeInOut/FadeInOut';
import { HTMLMotionProps } from 'framer-motion';
import {
	Alert,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	List,
	ListItemButton,
	Typography,
} from '@mui/material';
import NotificationsViewModel from './NotificationsViewModel';

type NotificationsProps = HTMLMotionProps<'div'>;

const Notifications = ({
	viewModel,
	...props
}: WithViewModelProps<NotificationsViewModel> & NotificationsProps) => (
	<FadeInOut data-testid="page-notifications" {...props}>
		<div className="w-full mb-4">
			<Typography variant="h5">Notifications</Typography>
		</div>
		<div className="container">
			<div className="col-12">
				<Alert severity="info" className="mb-4">
					An overview of notificatios API usage.
				</Alert>
			</div>
			<div className="col-6 col-offset-3">
				<Box className="bg-white">
					<List component="nav">
						<ListItemButton
							onClick={() =>
								viewModel.notificationMessage({
									title: 'Booring',
								})
							}
						>
							Defaults
						</ListItemButton>
						<ListItemButton
							onClick={() =>
								viewModel.notificationMessage({
									title: 'Successful test notification',
									type: 'success',
								})
							}
						>
							Click for a win
						</ListItemButton>
						<ListItemButton
							onClick={() =>
								viewModel.notificationMessage({
									title: 'Some help',
									type: 'info',
								})
							}
						>
							Need help?
						</ListItemButton>
					</List>
					<Divider />
					<List component="nav">
						<ListItemButton
							onClick={() =>
								viewModel.notificationMessage({
									title: 'You pushed it!',
									type: 'warning',
								})
							}
						>
							Don&apos;t push this
						</ListItemButton>
						<ListItemButton
							onClick={() =>
								viewModel.notificationMessage({
									title: 'An error occured',
									type: 'error',
								})
							}
						>
							You might brake something
						</ListItemButton>
					</List>
					<Divider />
					<List component="nav">
						<ListItemButton
							onClick={() =>
								viewModel.notificationMessage({
									title: 'This will never disappear',
									type: 'warning',
									important: true,
								})
							}
						>
							A really important message
						</ListItemButton>
						<ListItemButton
							onClick={() =>
								viewModel.notificationMessage({
									title: 'Click it!',
									type: 'info',
									important: true,
									closeable: true,
								})
							}
						>
							This you will be able to close
						</ListItemButton>
						<ListItemButton
							onClick={() =>
								viewModel.notificationMessage({
									title: 'Click it!',
									type: 'info',
									important: true,
									closeable: true,
									actions: [
										{
											title: 'Reset',
											callback: (close) => {
												viewModel.notificationMessage({
													title: 'Reset finished!',
													type: 'success',
												});
												close();
											},
										},
									],
								})
							}
						>
							With a reset action
						</ListItemButton>
					</List>
				</Box>
			</div>
		</div>
	</FadeInOut>
);

export default withViewModel<NotificationsProps, NotificationsViewModel>(
	Notifications,
	NotificationsViewModel
);
