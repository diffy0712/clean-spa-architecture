import { Link, NavLink } from 'react-router-dom';
import classnames from 'classnames';
import styles from './Navigation.module.scss';

const navLinkClassNamesCallback = ({ isActive }) =>
	classnames(styles.sidebarLink, {
		[styles.isActive]: isActive,
	})

const Navigation = () => (
	<div className={styles.sidebar} data-testid="layout-navigation">
		<div className={styles.logo}>
			<Link to="/">Clean SPA Architecture</Link>
		</div>
		<div className={styles.sideWrapper}>
			<div className={styles.sideMenu}>
				<NavLink
					to="/"
					className={navLinkClassNamesCallback}
				>
					README
				</NavLink>
			</div>
		</div>
		<div className={styles.sideWrapper}>
			<div className={styles.sideTitle}>Basic Examples</div>
			<div className={styles.sideMenu}>
				<NavLink
					to="/counter"
					className={navLinkClassNamesCallback}
				>
					Counter
				</NavLink>
				<NavLink
					to="/contact"
					className={navLinkClassNamesCallback}
				>
					Contact Form
				</NavLink>
				<NavLink
					to="/contact-vm"
					className={navLinkClassNamesCallback}
				>
					Contact Form - ViewModel
				</NavLink>
				<NavLink
					to="/notifications"
					className={navLinkClassNamesCallback}
				>
					Notifications
				</NavLink>
			</div>
		</div>
		<div className={styles.sideWrapper}>
			<div className={styles.sideTitle}>Complex Examples</div>
			<div className={styles.sideMenu}>
				<NavLink
					to="/products"
					className={navLinkClassNamesCallback}
				>
					Products CRUD
				</NavLink>
				<NavLink
					to="/campaigns"
					className={navLinkClassNamesCallback}
				>
					Campaigns
				</NavLink>
			</div>
		</div>
		<div className={styles.versionContainer}>v0.1.0</div>
	</div>
);

export default Navigation;
