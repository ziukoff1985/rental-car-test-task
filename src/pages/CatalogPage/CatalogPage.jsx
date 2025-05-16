import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBrands,
  selectFilters,
  selectHasMoreCars,
  selectIsError,
  selectIsLoading,
  selectPage,
  selectVisibleCars,
} from '../../redux/cars/selectors.js';
import {
  fetchBrandsThunk,
  fetchCarsThunk,
} from '../../redux/cars/operations.js';
import { incrementPage, setPage, resetCars } from '../../redux/cars/slice.js';
import styles from './CatalogPage.module.css';
import Filter from '../../components/Filter/Filter.jsx';
import CarCard from '../../components/CarCard/CarCard.jsx';
import Loader from '../../components/Loader/Loader.jsx';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectVisibleCars);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const hasMoreCars = useSelector(selectHasMoreCars);
  const filters = useSelector(selectFilters);
  const page = useSelector(selectPage);
  const brands = useSelector(selectBrands);

  // Використовуємо useRef для відстеження, чи був здійснений початковий запит
  // const initialFetchDone = useRef(false);

  // // Замінюємо проблемний useEffect
  // useEffect(() => {
  //   // Перевіряємо, чи запит ще не було здійснено
  //   if (!initialFetchDone.current) {
  //     dispatch(fetchCarsThunk({ page, filters }));
  //     initialFetchDone.current = true;
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);

  // Функція для перевірки, чи фільтри порожні
  const areFiltersEmpty = filters =>
    Object.values(filters).every(val => val === '');

  // Виконуємо запит лише при першому завантаженні, якщо cars порожній
  useEffect(() => {
    if (cars.length === 0 && !isLoading && areFiltersEmpty(filters)) {
      console.log('Initial fetch triggered', { page: 1, filters });
      dispatch(fetchCarsThunk({ page: 1, filters }));
    }
  }, [dispatch, cars.length, isLoading, filters]);

  useEffect(() => {
    if (!brands.length) {
      dispatch(fetchBrandsThunk());
    }
  }, [dispatch, brands]);

  const handleSearch = () => {
    dispatch(resetCars());
    dispatch(setPage(1));
    dispatch(fetchCarsThunk({ page: 1, filters }));
  };

  const handleLoadMore = () => {
    dispatch(incrementPage());
    dispatch(fetchCarsThunk({ page: page + 1, filters }));
  };

  return (
    <div className={styles.container}>
      <Filter onSearch={handleSearch} />
      {!isLoading && cars.length === 0 && (
        <>
          <p className={styles.noResults}>No results found</p>
          <p className={styles.noResults}>
            Try changing the filters and search again
          </p>
        </>
      )}
      {isLoading && <Loader loading={isLoading} />}
      {isError && <p className={styles.error}>Error: {isError}</p>}
      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
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
