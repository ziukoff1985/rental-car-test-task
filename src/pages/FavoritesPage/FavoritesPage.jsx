import { useSelector } from 'react-redux';
import {
  selectFavorites,
  selectIsLoading,
  selectIsError,
} from '../../redux/cars/selectors.js';
import { clearFavorites } from '../../redux/cars/slice.js';
import { useDispatch } from 'react-redux';
import CarCard from '../../components/CarCard/CarCard.jsx';

import styles from './FavoritesPage.module.css';
import Loader from '../../components/Loader/Loader.jsx';

const FavoritesPage = () => {
  const favorites = useSelector(selectFavorites);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const dispatch = useDispatch();

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>Error: {isError}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Your Favorite Cars</h2>
        {favorites.length > 0 && (
          <button onClick={handleClearFavorites} className={styles.clearButton}>
            Clear Favorites
          </button>
        )}
      </div>
      {favorites.length === 0 ? (
        <p className={styles.noCars}>No favorite cars yet.</p>
      ) : (
        <div className={styles.grid}>
          {favorites.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
