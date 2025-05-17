import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { selectBrands, selectFilters } from '../../redux/cars/selectors.js';
import { setFilters, clearFilters } from '../../redux/cars/slice.js';
import { fetchCarsThunk } from '../../redux/cars/operations.js';
import { useEffect } from 'react';
import FilterSelect from '../FilterSelect/FilterSelect.jsx';
import MileageInput from '../MileageInput/MileageInput.jsx';
import styles from './Filter.module.css';

// Додаємо debounce - функція, яка обмежує частоту виклику функції
// debounce(func, wait) - повертає нову функцію, яка буде викликати func не частіше ніж раз на wait мс
const debouncedSetFilters = debounce((values, dispatch) => {
  dispatch(setFilters(values));
}, 300);

const Filter = ({ onSearch }) => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    return () => {
      debouncedSetFilters.cancel();
    };
  }, []);

  const handleSelectChange = (selectedOption, actionMeta) => {
    dispatch(setFilters({ [actionMeta.name]: selectedOption.value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(
      fetchCarsThunk({
        page: 1,
        filters: { brand: '', rentalPrice: '', minMileage: '', maxMileage: '' },
      })
    );
  };

  const brandOptions = brands.map(brand => ({
    value: brand,
    label: brand,
  }));

  const priceOptions = [30, 40, 50, 60, 70, 80].map(price => ({
    value: price,
    label: `${price}`,
    formattedLabel: `To $${price}`,
  }));

  return (
    <div className={styles.filter}>
      <label className={styles.label}>
        <span>Car brand</span>
        <FilterSelect
          name="brand"
          value={
            filters.brand
              ? { value: filters.brand, label: filters.brand }
              : null
          }
          onChange={handleSelectChange}
          options={brandOptions}
          placeholder="Choose a brand"
        />
      </label>

      <label className={styles.label}>
        <span>Price/1 hour</span>
        <FilterSelect
          name="rentalPrice"
          value={
            filters.rentalPrice
              ? priceOptions.find(option => option.value == filters.rentalPrice)
              : null
          }
          onChange={handleSelectChange}
          options={priceOptions}
          placeholder="Choose a price"
          formatOptionLabel={(option, { context }) =>
            context === 'value' ? `To $${option.value}` : option.label
          }
        />
      </label>

      <label className={styles.label}>
        <span>Car mileage / km</span>
        <MileageInput
          minMileage={filters.minMileage}
          maxMileage={filters.maxMileage}
          onChange={debouncedSetFilters}
          dispatch={dispatch}
        />
      </label>

      <div className={styles.buttons}>
        <button onClick={onSearch} className={styles.searchButton}>
          Search
        </button>
        <button onClick={handleClearFilters} className={styles.clearButton}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default Filter;