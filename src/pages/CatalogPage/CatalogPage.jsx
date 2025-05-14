import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilters,
  selectHasMoreCars,
  selectIsError,
  selectIsLoading,
  selectPage,
  selectVisibleCars,
} from '../../redux/cars/selectors.js';
import { fetchCarsThunk } from '../../redux/cars/operations.js';
import { incrementPage, setPage, resetCars } from '../../redux/cars/slice.js';
import styles from './CatalogPage.module.css';
import Filter from '../../components/Filter/Filter.jsx';
import CarCard from '../../components/CarCard/CarCard.jsx';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectVisibleCars);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const hasMoreCars = useSelector(selectHasMoreCars);
  const filters = useSelector(selectFilters);
  const page = useSelector(selectPage);

  useEffect(() => {
    // Виклик fetchCarsThunk відбувається лише при зміні page
    dispatch(fetchCarsThunk({ page, filters }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  const handleSearch = () => {
    dispatch(resetCars());
    dispatch(setPage(1));
    dispatch(fetchCarsThunk({ page: 1, filters }));
  };

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  return (
    <div className={styles.container}>
      <Filter onSearch={handleSearch} />
      {isLoading && <p className={styles.loading}>Loading...</p>}
      {isError && <p className={styles.error}>Error: {isError}</p>}
      <div className={styles.grid}>
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      {hasMoreCars && !isLoading && (
        <button onClick={handleLoadMore} className={styles.loadMoreButton}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CatalogPage;
