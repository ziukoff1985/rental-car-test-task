import styles from './CarDetailsInfoComp.module.css';
import sprite from '../../assets/images/svg-icons-sprite.svg';

const CarDetailsInfoComp = ({ car }) => {
  const formatMileage = mileage => {
    return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <div className={styles.rightColumn}>
      <div className={styles.carInfo}>
        <h2
          className={styles.carTitle}
        >{`${car.brand} ${car.model}, ${car.year}`}</h2>
        <p className={styles.carId}>ID: {car.id}</p>
        <div className={styles.location}>
          <svg className={styles.icon} width="16" height="16">
            <use href={`${sprite}#icon-location`} />
          </svg>
          <p className={styles.carLocation}>Location: {car.address}</p>
        </div>
        <p className={styles.carMileage}>
          Mileage: {formatMileage(car.mileage)} km
        </p>
        <p className={styles.carPrice}>${car.rentalPrice}/hour</p>
        <p className={styles.carDescription}>{car.description}</p>
        <div className={styles.carListWrapContainer}>
          <div className={styles.carListWrap}>
            <h3 className={styles.carSubtitle}>Rental Conditions:</h3>
            <ul className={styles.carList}>
              {car.rentalConditions?.map((condition, index) => (
                <li key={index} className={styles.carListItem}>
                  <svg className={styles.icon} width="16" height="16">
                    <use href={`${sprite}#icon-check-circle`} />
                  </svg>
                  {condition}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.carListWrap}>
            <h3 className={styles.carSubtitle}>Car Specifications:</h3>
            <ul className={styles.carList}>
              <li className={styles.carListItem}>
                <svg className={styles.icon} width="16" height="16">
                  <use href={`${sprite}#icon-calendar`} />
                </svg>
                Year: {car.year}
              </li>
              <li className={styles.carListItem}>
                <svg className={styles.icon} width="16" height="16">
                  <use href={`${sprite}#icon-car`} />
                </svg>
                Type: {car.type}
              </li>
              <li className={styles.carListItem}>
                <svg className={styles.icon} width="16" height="16">
                  <use href={`${sprite}#icon-fuel-pump`} />
                </svg>
                Fuel Consumption: {car.fuelConsumption} L/100km
              </li>
              <li className={styles.carListItem}>
                <svg className={styles.icon} width="16" height="16">
                  <use href={`${sprite}#icon-gear`} />
                </svg>
                Engine Size: {car.engineSize}
              </li>
            </ul>
          </div>
          <div className={styles.carListWrap}>
            <h3 className={styles.carSubtitle}>
              Accessories and Functionalities:
            </h3>
            <ul className={styles.carList}>
              {car.accessories.map((accessory, index) => (
                <li key={index} className={styles.carListItem}>
                  <svg className={styles.icon} width="16" height="16">
                    <use href={`${sprite}#icon-check-circle`} />
                  </svg>
                  {accessory}
                </li>
              ))}
              {car.functionalities.map((functionality, index) => (
                <li key={index} className={styles.carListItem}>
                  <svg className={styles.icon} width="16" height="16">
                    <use href={`${sprite}#icon-check-circle`} />
                  </svg>
                  {functionality}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsInfoComp;
