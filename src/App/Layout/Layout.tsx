import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from '@App/Layout/Navigation/Navigation';
import Routes from '@App/Layout/Routes';
import Notifications from '@App/Layout/Notifications/Notifications';
import styles from './Layout.module.scss';

const Layout = () => (
	<>
		<Notifications />
		<Router>
			<div className={styles.container}>
				<Navigation />
				<div className={styles.wrapper} data-testid="layout-main-container">
					<div className={styles.mainContainer}>
						<Routes />
					</div>
				</div>
			</div>
		</Router>
	</>
);

export default Layout;
