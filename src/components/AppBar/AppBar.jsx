import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./AppBar.module.css";

const AppBar = () => {
  return (
    <header className={styles.header}>
      <NavLink to="/">
        <Logo />
      </NavLink>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};

export default AppBar;
