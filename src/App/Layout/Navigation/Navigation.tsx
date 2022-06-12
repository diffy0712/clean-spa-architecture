import { Link, NavLink } from 'react-router-dom';
import classnames from 'classnames';
import styles from './Navigation.module.scss';

const Navigation = () => (
	<div className={styles.sidebar} data-testid="layout-navigation">
		<div className={styles.logo}>
			<Link to="/">Clean SPA Architecture</Link>
		</div>
		<div className={styles.sideWrapper}>
			<div className={styles.sideMenu}>
				<NavLink
					to="/"
					className={({ isActive }) =>
						classnames(styles.sidebarLink, {
							[styles.isActive]: isActive,
						})
					}
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
					className={({ isActive }) =>
						classnames(styles.sidebarLink, {
							[styles.isActive]: isActive,
						})
					}
				>
					Counter
				</NavLink>
				<NavLink
					to="/contact"
					className={({ isActive }) =>
						classnames(styles.sidebarLink, {
							[styles.isActive]: isActive,
						})
					}
				>
					Contact Form
				</NavLink>
				<NavLink
					to="/contact-vm"
					className={({ isActive }) =>
						classnames(styles.sidebarLink, {
							[styles.isActive]: isActive,
						})
					}
				>
					Contact Form - ViewModel
				</NavLink>
				<NavLink
					to="/notifications"
					className={({ isActive }) =>
						classnames(styles.sidebarLink, {
							[styles.isActive]: isActive,
						})
					}
				>
					Notifications
				</NavLink>
			</div>
		</div>
		<div className={styles.sideWrapper}>
			<div className={styles.sideTitle}>Complex Examples</div>
			<div className={styles.sideMenu}>
				<NavLink
					to="/campaigns"
					className={({ isActive }) =>
						classnames(styles.sidebarLink, {
							[styles.isActive]: isActive,
						})
					}
				>
					Campaigns CRUD
				</NavLink>
			</div>
		</div>
		<div className={styles.versionContainer}>v0.1.0</div>
	</div>
);

export default Navigation;
