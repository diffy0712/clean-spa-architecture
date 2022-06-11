import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import Routes from './Routes';
import styles from './Layout.module.scss';
import Notifications from './Notifications/Notifications';

const Layout = () => (
	<>
		<Notifications />
		<Router>
			<div className={styles.container}>
				<Navigation />
				<div className={styles.wrapper}>
					<div className={styles.mainContainer}>
						<Routes />
					</div>
				</div>
			</div>
		</Router>
	</>
);

export default Layout;
