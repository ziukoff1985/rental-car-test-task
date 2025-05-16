import { NumberFormatBase } from 'react-number-format';
import styles from './MileageInput.module.css';

const MileageInput = ({ minMileage, maxMileage, onChange, dispatch }) => {
  const formatMinMileage = numStr => {
    if (numStr === '' || numStr === undefined) return '';
    return `From ${new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(Number(numStr))}`;
  };

  const formatMaxMileage = numStr => {
    if (numStr === '' || numStr === undefined) return '';
    return `To ${new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(Number(numStr))}`;
  };

  return (
    <div className={styles.mileage}>
      <NumberFormatBase
        name="minMileage"
        value={minMileage}
        onValueChange={values =>
          onChange({ minMileage: values.value }, dispatch)
        }
        format={formatMinMileage}
        placeholder="From"
        className={styles.inputFrom}
      />
      <NumberFormatBase
        name="maxMileage"
        value={maxMileage}
        onValueChange={values =>
          onChange({ maxMileage: values.value }, dispatch)
        }
        format={formatMaxMileage}
        placeholder="To"
        className={styles.inputTo}
      />
    </div>
  );
};

export default MileageInput;
