import { useSelector, useDispatch } from 'react-redux';
import { selectBrands, selectFilters } from '../../redux/cars/selectors.js';
import { setFilters, clearFilters } from '../../redux/cars/slice.js';
import styles from './Filter.module.css';
import { fetchCarsThunk } from '../../redux/cars/operations.js';
import Select from 'react-select';
import { NumberFormatBase } from 'react-number-format'; // Оновлений імпорт

const Filter = ({ onSearch }) => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const filters = useSelector(selectFilters);

  // Обробник для react-select
  const handleSelectChange = (selectedOption, actionMeta) => {
    dispatch(setFilters({ [actionMeta.name]: selectedOption.value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    // Викликаємо fetchCarsThunk із порожніми фільтрами, щоб відобразити всі авто
    dispatch(
      fetchCarsThunk({
        page: 1,
        filters: { brand: '', rentalPrice: '', minMileage: '', maxMileage: '' },
      })
    );
  };

  // Опції для brand select
  const brandOptions = brands.map(brand => ({
    value: brand,
    label: brand,
  }));

  // Опції для price select
  const priceOptions = [30, 40, 50, 60, 70, 80].map(price => ({
    value: price,
    label: `${price}`,
    formattedLabel: `To $${price}`,
  }));

  // Кастомні стилі для Select, щоб відповідали вашим CSS класам
  const customStyles = {
    control: provided => ({
      ...provided,
      background: '#f7f7f7',
      border: 'none',
      borderRadius: '12px',
      padding: '4px 8px',
      width: '204px',
      height: '44px',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: 1.25,
      color: '#101828',
      cursor: 'pointer',
      boxShadow: 'none',
      '&:hover': {
        border: 'none',
      },
    }),
    valueContainer: provided => ({
      ...provided,
      padding: '0 8px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: provided => ({
      ...provided,
      color: '#333',
      padding: '0 8px',
    }),
    menu: provided => ({
      ...provided,
      borderRadius: '12px',
      overflow: 'hidden',
      zIndex: 10,
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected
        ? '#3470ff'
        : state.isFocused
        ? '#e6e6e6'
        : null,
      color: state.isSelected ? 'white' : '#101828',
      cursor: 'pointer',
      padding: '10px 16px',
    }),
    placeholder: provided => ({
      ...provided,
      color: '#101828',
    }),
  };

  // Функція для форматування minMileage (From 3,000)
  const formatMinMileage = numStr => {
    if (numStr === '' || numStr === undefined) return '';
    return `From ${new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(Number(numStr))}`;
  };

  // Функція для форматування maxMileage (To 5,500)
  const formatMaxMileage = numStr => {
    if (numStr === '' || numStr === undefined) return '';
    return `To ${new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(Number(numStr))}`;
  };

  return (
    <div className={styles.filter}>
      <label className={styles.label}>
        <span>Car brand</span>
        <div className={styles.selectWrapper}>
          <Select
            name="brand"
            value={
              filters.brand
                ? { value: filters.brand, label: filters.brand }
                : null
            }
            onChange={(option, actionMeta) =>
              handleSelectChange(option, { ...actionMeta, name: 'brand' })
            }
            options={brandOptions}
            placeholder="Choose a brand"
            styles={customStyles}
            className={styles.reactSelect}
            classNamePrefix="react-select"
            isSearchable={false}
          />
        </div>
      </label>

      <label className={styles.label}>
        <span>Price/1 hour</span>
        <div className={styles.selectWrapper}>
          <Select
            name="rentalPrice"
            value={
              filters.rentalPrice
                ? priceOptions.find(
                    option => option.value == filters.rentalPrice
                  )
                : null
            }
            onChange={(option, actionMeta) =>
              handleSelectChange(option, { ...actionMeta, name: 'rentalPrice' })
            }
            options={priceOptions}
            placeholder="Choose a price"
            styles={customStyles}
            className={styles.reactSelect}
            classNamePrefix="react-select"
            isSearchable={false}
            formatOptionLabel={(option, { context }) => {
              // Якщо це вибране значення, показуємо "To $XX"
              if (context === 'value') {
                return `To $${option.value}`;
              }
              // У випадаючому списку показуємо просто цифру
              return option.label;
            }}
          />
        </div>
      </label>

      <label className={styles.label}>
        <span>Car mileage / km</span>
        <div className={styles.mileage}>
          <NumberFormatBase
            name="minMileage"
            value={filters.minMileage}
            onValueChange={values => {
              dispatch(setFilters({ minMileage: values.value }));
            }}
            format={formatMinMileage}
            placeholder="From"
            className={styles.inputFrom}
          />
          <NumberFormatBase
            name="maxMileage"
            value={filters.maxMileage}
            onValueChange={values => {
              dispatch(setFilters({ maxMileage: values.value }));
            }}
            format={formatMaxMileage}
            placeholder="To"
            className={styles.inputTo}
          />
        </div>
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
