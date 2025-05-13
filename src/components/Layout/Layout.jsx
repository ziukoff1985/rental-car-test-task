import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import AppBar from "../AppBar/AppBar.jsx";

const Layout = () => {
  return (
    <div className={styles.wrap}>
      <AppBar />
      <Outlet />
    </div>
  );
};

export default Layout;
