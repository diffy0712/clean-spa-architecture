import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Routes from "./Routes";
import styles from "./Layout.module.css";

const Layout = () => (
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
);

export default Layout;
