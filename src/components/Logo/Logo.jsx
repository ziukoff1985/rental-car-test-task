import sprite from "../../assets/images/icons.svg";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <svg className={styles.icon} width="102" height="16">
      <use href={`${sprite}#icon-logo`} />
    </svg>
  );
};

export default Logo;
