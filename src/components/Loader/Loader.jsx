import { RiseLoader } from 'react-spinners';
import styles from './Loader.module.css';

const Loader = ({ loading }) => {
  return loading ? (
    <div className={styles.loader}>
      <RiseLoader
        size={15}
        color="#4fa94d"
        loading={loading}
        aria-label="rise-loading"
      />
    </div>
  ) : null;
};

export default Loader;
