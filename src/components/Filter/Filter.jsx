import { useSelector, useDispatch } from "react-redux";
import { selectBrands, selectFilters } from "../../redux/cars/selectors.js";
import { setFilters, clearFilters } from "../../redux/cars/slice.js";
import styles from "./Filter.module.css";

const Filter = ({ onSearch }) => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const filters = useSelector(selectFilters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className={styles.filter}>
      <label className={styles.label}>
        <span>Car brand</span>
        <div className={styles.selectWrapper}>
          <select
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className={styles.select}
          >
            <option value="" disabled hidden>
              Choose a brand
            </option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </label>

      <label className={styles.label}>
        <span>Price/1 hour</span>
        <div className={styles.selectWrapper}>
          <select
            name="rentalPrice"
            value={filters.rentalPrice}
            onChange={handleFilterChange}
            className={styles.select}
          >
            <option value="" disabled hidden>
              Choose a price
            </option>
            {[30, 40, 50, 60, 70, 80].map((price) => (
              <option key={price} value={price}>
                {price}$
              </option>
            ))}
          </select>
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
