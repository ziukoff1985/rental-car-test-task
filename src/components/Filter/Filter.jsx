import { useSelector, useDispatch } from 'react-redux';
import { selectBrands, selectFilters } from '../../redux/cars/selectors.js';
import { setFilters, clearFilters } from '../../redux/cars/slice.js';
import styles from './Filter.module.css';
import { fetchCarsThunk } from '../../redux/cars/operations.js';
import Select from 'react-select';

const Filter = ({ onSearch }) => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const filters = useSelector(selectFilters);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

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
          <input
            type="number"
            name="minMileage"
            value={filters.minMileage}
            onChange={handleFilterChange}
            placeholder="From"
            className={styles.inputFrom}
          />
          <input
            type="number"
            name="maxMileage"
            value={filters.maxMileage}
            onChange={handleFilterChange}
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

// import { useSelector, useDispatch } from 'react-redux';
// import { selectBrands, selectFilters } from '../../redux/cars/selectors.js';
// import { setFilters, clearFilters } from '../../redux/cars/slice.js';
// import styles from './Filter.module.css';
// import { fetchCarsThunk } from '../../redux/cars/operations.js';

// const Filter = ({ onSearch }) => {
//   const dispatch = useDispatch();
//   const brands = useSelector(selectBrands);
//   const filters = useSelector(selectFilters);

//   const handleFilterChange = e => {
//     const { name, value } = e.target;
//     dispatch(setFilters({ [name]: value }));
//   };

//   const handleClearFilters = () => {
//     dispatch(clearFilters());
//     // Викликаємо fetchCarsThunk із порожніми фільтрами, щоб відобразити всі авто
//     dispatch(
//       fetchCarsThunk({
//         page: 1,
//         filters: { brand: '', rentalPrice: '', minMileage: '', maxMileage: '' },
//       })
//     );
//   };

//   return (
//     <div className={styles.filter}>
//       <label className={styles.label}>
//         <span>Car brand</span>
//         <div className={styles.selectWrapper}>
//           <select
//             name="brand"
//             value={filters.brand}
//             onChange={handleFilterChange}
//             className={styles.select}
//           >
//             <option value="" disabled hidden>
//               Choose a brand
//             </option>
//             {brands.map(brand => (
//               <option key={brand} value={brand}>
//                 {brand}
//               </option>
//             ))}
//           </select>
//         </div>
//       </label>

//       <label className={styles.label}>
//         <span>Price/1 hour</span>
//         <div className={styles.selectWrapper}>
//           <select
//             name="rentalPrice"
//             value={filters.rentalPrice}
//             onChange={handleFilterChange}
//             className={styles.select}
//           >
//             <option value="" disabled hidden>
//               Choose a price
//             </option>
//             {[30, 40, 50, 60, 70, 80].map(price => (
//               <option key={price} value={price}>
//                 {price}
//               </option>
//             ))}
//           </select>
//         </div>
//       </label>

//       <label className={styles.label}>
//         <span>Car mileage / km</span>
//         <div className={styles.mileage}>
//           <input
//             type="number"
//             name="minMileage"
//             value={filters.minMileage}
//             onChange={handleFilterChange}
//             placeholder="From"
//             className={styles.inputFrom}
//           />
//           <input
//             type="number"
//             name="maxMileage"
//             value={filters.maxMileage}
//             onChange={handleFilterChange}
//             placeholder="To"
//             className={styles.inputTo}
//           />
//         </div>
//       </label>

//       <div className={styles.buttons}>
//         <button onClick={onSearch} className={styles.searchButton}>
//           Search
//         </button>
//         <button onClick={handleClearFilters} className={styles.clearButton}>
//           Clear
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Filter;
