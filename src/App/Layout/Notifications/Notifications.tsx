import { Button, IconButton, Snackbar } from "@mui/material";
import withViewModel, { WithViewModelProps } from "../../../System/Components/Hoc/withViewModel";
import NotificationsViewModel from "./NotificationsViewModel";
import CloseIcon from '@mui/icons-material/Close';

const Notifications = ({viewModel}: WithViewModelProps<NotificationsViewModel>) => (
    <>
        {viewModel.notifications.map((notification, index) => (
            <Snackbar
                open
                key={`${notification}-${index}`}
                message={notification.title}
                action={ <>
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={() => viewModel.deleteNotification(notification)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                </>}
            />
        ))}
    </>
);

export default withViewModel<{}, NotificationsViewModel, {}>(Notifications, NotificationsViewModel);