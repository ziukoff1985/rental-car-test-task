import { useEffect, useRef, useState } from 'react';
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

  // ВИПРАВЛЕННЯ: Замінили isScrollingUp на більш зрозумілий showFloatingFilter
  const [showFloatingFilter, setShowFloatingFilter] = useState(false);
  // ВИПРАВЛЕННЯ: Використовуємо useRef для ефективнішого відстеження скролу
  const lastScrollY = useRef(0);
  // ВИПРАВЛЕННЯ: Додаємо пряме посилання на DOM-елемент фільтра
  const filterRef = useRef(null);
  // Додаємо новий стан для відстеження завантаження через кнопку
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Якщо зараз завантажуємо більше машин через кнопку, не показуємо фільтр
      if (isLoadingMore) return;

      const currentScrollY = window.scrollY;

      // ВИПРАВЛЕННЯ: Перевіряємо чи фільтр вже вийшов за межі видимої області
      const filterIsOutOfView =
        filterRef.current &&
        filterRef.current.getBoundingClientRect().bottom < 0;

      // ВИПРАВЛЕННЯ 2.0: Спростили логіку для більш надійної роботи з повільними скролами
      // Якщо рухаємося вгору (будь-яка швидкість) І фільтр не видно - показуємо плаваючий фільтр
      if (currentScrollY < lastScrollY.current && filterIsOutOfView) {
        // Затримки не має - фільтр з'являється відразу при будь-якому скролі вгору
        setShowFloatingFilter(true);
      }
      // Якщо рухаємося вниз або фільтр знову став видимим - ховаємо плаваючий фільтр
      else if (currentScrollY > lastScrollY.current || !filterIsOutOfView) {
        setShowFloatingFilter(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoadingMore]); // Додаємо залежність isLoadingMore

  // Функція для перевірки, чи фільтри порожні
  const areFiltersEmpty = filters =>
    Object.values(filters).every(val => val === '');

  // Виконуємо запит якщо cars порожній, isLoading false і фільтри порожні
  // Щоб уникнути повторного запиту при кожному рендері і не було infinite loop при No results
  useEffect(() => {
    if (cars.length === 0 && !isLoading && areFiltersEmpty(filters)) {
      dispatch(fetchCarsThunk({ page, filters }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, cars.length, isLoading]);

  // Виконуємо запит на отримання брендів лише якщо brands порожній
  useEffect(() => {
    if (!brands.length) {
      dispatch(fetchBrandsThunk());
    }
  }, [dispatch, brands]);

  // Додаємо ефект для скидання isLoadingMore після завершення завантаження
  useEffect(() => {
    if (!isLoading && isLoadingMore) {
      setIsLoadingMore(false);
    }
  }, [isLoading, isLoadingMore]);

  const handleSearch = () => {
    dispatch(resetCars());
    dispatch(setPage(1));
    dispatch(fetchCarsThunk({ page: 1, filters }));
    // ВИПРАВЛЕННЯ: Приховуємо плаваючий фільтр після пошуку
    setShowFloatingFilter(false);
  };

  const handleLoadMore = () => {
    // Встановлюємо прапорець, щоб заблокувати появу фільтра
    setIsLoadingMore(true);
    // Ховаємо плаваючий фільтр
    setShowFloatingFilter(false);

    dispatch(incrementPage());
    dispatch(fetchCarsThunk({ page: page + 1, filters }));
  };

  return (
    <div className={styles.container}>
      {/* ВИПРАВЛЕННЯ: Додаємо ref до контейнера фільтра */}
      <div ref={filterRef} className={styles.filterContainer}>
        <Filter onSearch={handleSearch} />
      </div>

      {/* ВИПРАВЛЕННЯ: Окремий плаваючий фільтр, що з'являється умовно */}
      {showFloatingFilter && (
        <div className={styles.floatingFilter}>
          <Filter onSearch={handleSearch} />
        </div>
      )}
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
