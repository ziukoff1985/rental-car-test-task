import Select, { components } from 'react-select';
import styles from './FilterSelect.module.css';
import sprite from '../../assets/images/svg-icons-sprite.svg';

// Кастомний DropdownIndicator з використанням SVG зі спрайта
const CustomDropdownIndicator = props => {
  const {
    selectProps: { menuIsOpen },
  } = props;

  return (
    <components.DropdownIndicator {...props}>
      {menuIsOpen ? (
        <svg className={styles.icon} width="16" height="16">
          <use href={`${sprite}#icon-select-prop-up`} />
        </svg>
      ) : (
        <svg className={styles.icon} width="16" height="16">
          <use href={`${sprite}#icon-select-prop-down`} />
        </svg>
      )}
    </components.DropdownIndicator>
  );
};

const FilterSelect = ({
  name,
  value,
  onChange,
  options,
  placeholder,
  customStyles: externalStyles,
  formatOptionLabel,
}) => {
  const defaultStyles = {
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
        ? 'white'
        : state.isFocused
        ? '#f7f7f7'
        : null,
      color: state.isSelected ? '#101828' : '#8d929a',
      fontWeight: state.isSelected ? 600 : 500,
      cursor: 'pointer',
      padding: '10px 16px',
    }),
    placeholder: provided => ({
      ...provided,
      color: '#101828',
    }),
  };

  const mergedStyles = externalStyles
    ? { ...defaultStyles, ...externalStyles }
    : defaultStyles;

  const selectComponents = {
    DropdownIndicator: CustomDropdownIndicator,
  };

  return (
    <div className={styles.selectWrapper}>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        styles={mergedStyles}
        components={selectComponents}
        className={styles.reactSelect}
        classNamePrefix="react-select"
        isSearchable={false}
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
};

export default FilterSelect;
