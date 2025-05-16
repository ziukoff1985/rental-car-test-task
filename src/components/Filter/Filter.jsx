import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { selectBrands, selectFilters } from '../../redux/cars/selectors.js';
import { setFilters, clearFilters } from '../../redux/cars/slice.js';
import { fetchCarsThunk } from '../../redux/cars/operations.js';
import { useEffect } from 'react';
import FilterSelect from '../FilterSelect/FilterSelect.jsx';
import MileageInput from '../MileageInput/MileageInput.jsx';
import styles from './Filter.module.css';

// Додаємо дебаунсинг
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

// import { useSelector, useDispatch } from 'react-redux';
// import { debounce } from 'lodash';
// import { selectBrands, selectFilters } from '../../redux/cars/selectors.js';
// import { setFilters, clearFilters } from '../../redux/cars/slice.js';
// import styles from './Filter.module.css';
// import { fetchCarsThunk } from '../../redux/cars/operations.js';
// import Select, { components } from 'react-select';
// import { NumberFormatBase } from 'react-number-format';
// import sprite from '../../assets/images/svg-icons-sprite.svg';
// import { useEffect } from 'react';

// // ✅ Кастомний DropdownIndicator з використанням SVG зі спрайта
// const CustomDropdownIndicator = props => {
//   const {
//     selectProps: { menuIsOpen },
//   } = props;

//   return (
//     <components.DropdownIndicator {...props}>
//       {menuIsOpen ? (
//         <svg className={styles.icon} width="16" height="16">
//           <use href={`${sprite}#icon-select-prop-up`} />
//         </svg>
//       ) : (
//         <svg className={styles.icon} width="16" height="16">
//           <use href={`${sprite}#icon-select-prop-down`} />
//         </svg>
//       )}
//     </components.DropdownIndicator>
//   );
// };

// // Додаємо дебаунсинг
// const debouncedSetFilters = debounce((values, dispatch) => {
//   dispatch(setFilters(values));
// }, 300);

// const Filter = ({ onSearch }) => {
//   const dispatch = useDispatch();
//   const brands = useSelector(selectBrands);
//   const filters = useSelector(selectFilters);

//   useEffect(() => {
//     return () => {
//       debouncedSetFilters.cancel();
//     };
//   }, []);

//   const handleSelectChange = (selectedOption, actionMeta) => {
//     dispatch(setFilters({ [actionMeta.name]: selectedOption.value }));
//   };

//   const handleClearFilters = () => {
//     dispatch(clearFilters());
//     dispatch(
//       fetchCarsThunk({
//         page: 1,
//         filters: { brand: '', rentalPrice: '', minMileage: '', maxMileage: '' },
//       })
//     );
//   };

//   const brandOptions = brands.map(brand => ({
//     value: brand,
//     label: brand,
//   }));

//   const priceOptions = [30, 40, 50, 60, 70, 80].map(price => ({
//     value: price,
//     label: `${price}`,
//     formattedLabel: `To $${price}`,
//   }));

//   // ✅ Передаємо кастомний компонент у Select
//   const selectComponents = {
//     DropdownIndicator: CustomDropdownIndicator,
//   };

//   const customStyles = {
//     control: provided => ({
//       ...provided,
//       background: '#f7f7f7',
//       border: 'none',
//       borderRadius: '12px',
//       padding: '4px 8px',
//       width: '204px',
//       height: '44px',
//       fontWeight: 500,
//       fontSize: '16px',
//       lineHeight: 1.25,
//       color: '#101828',
//       cursor: 'pointer',
//       boxShadow: 'none',
//     }),
//     valueContainer: provided => ({
//       ...provided,
//       padding: '0 8px',
//     }),
//     indicatorSeparator: () => ({
//       display: 'none',
//     }),
//     dropdownIndicator: provided => ({
//       ...provided,
//       padding: '0 8px',
//     }),
//     menu: provided => ({
//       ...provided,
//       borderRadius: '12px',
//       overflow: 'hidden',
//       zIndex: 10,
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       background: state.isSelected
//         ? '#3470ff'
//         : state.isFocused
//         ? '#e6e6e6'
//         : null,
//       color: state.isSelected ? 'white' : '#101828',
//       cursor: 'pointer',
//       padding: '10px 16px',
//     }),
//     placeholder: provided => ({
//       ...provided,
//       color: '#101828',
//     }),
//   };

//   const formatMinMileage = numStr => {
//     if (numStr === '' || numStr === undefined) return '';
//     return `From ${new Intl.NumberFormat('en-US', {
//       maximumFractionDigits: 0,
//     }).format(Number(numStr))}`;
//   };

//   const formatMaxMileage = numStr => {
//     if (numStr === '' || numStr === undefined) return '';
//     return `To ${new Intl.NumberFormat('en-US', {
//       maximumFractionDigits: 0,
//     }).format(Number(numStr))}`;
//   };

//   return (
//     <div className={styles.filter}>
//       <label className={styles.label}>
//         <span>Car brand</span>
//         <div className={styles.selectWrapper}>
//           <Select
//             name="brand"
//             value={
//               filters.brand
//                 ? { value: filters.brand, label: filters.brand }
//                 : null
//             }
//             onChange={(option, actionMeta) =>
//               handleSelectChange(option, { ...actionMeta, name: 'brand' })
//             }
//             options={brandOptions}
//             placeholder="Choose a brand"
//             styles={customStyles}
//             components={selectComponents} // ✅ Додаємо кастомний індикатор
//             className={styles.reactSelect}
//             classNamePrefix="react-select"
//             isSearchable={false}
//           />
//         </div>
//       </label>

//       <label className={styles.label}>
//         <span>Price/1 hour</span>
//         <div className={styles.selectWrapper}>
//           <Select
//             name="rentalPrice"
//             value={
//               filters.rentalPrice
//                 ? priceOptions.find(
//                     option => option.value == filters.rentalPrice
//                   )
//                 : null
//             }
//             onChange={(option, actionMeta) =>
//               handleSelectChange(option, { ...actionMeta, name: 'rentalPrice' })
//             }
//             options={priceOptions}
//             placeholder="Choose a price"
//             styles={customStyles}
//             components={selectComponents} // ✅ Додаємо кастомний індикатор
//             className={styles.reactSelect}
//             classNamePrefix="react-select"
//             isSearchable={false}
//             formatOptionLabel={(option, { context }) => {
//               if (context === 'value') {
//                 return `To $${option.value}`;
//               }
//               return option.label;
//             }}
//           />
//         </div>
//       </label>

//       <label className={styles.label}>
//         <span>Car mileage / km</span>
//         <div className={styles.mileage}>
//           <NumberFormatBase
//             name="minMileage"
//             value={filters.minMileage}
//             onValueChange={values =>
//               debouncedSetFilters({ minMileage: values.value }, dispatch)
//             }
//             format={formatMinMileage}
//             placeholder="From"
//             className={styles.inputFrom}
//           />
//           <NumberFormatBase
//             name="maxMileage"
//             value={filters.maxMileage}
//             onValueChange={values =>
//               debouncedSetFilters({ maxMileage: values.value }, dispatch)
//             }
//             format={formatMaxMileage}
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
