import { RiseLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <RiseLoader
        size={15}
        color="#4fa94d"
        loading={true}
        aria-label="rise-loading"
      />
    </div>
  );
};

export default Loader;
