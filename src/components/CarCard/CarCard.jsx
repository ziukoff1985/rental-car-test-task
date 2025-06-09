import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addOrRemoveFromFavorites } from '../../redux/cars/slice.js';
import { selectFavorites } from '../../redux/cars/selectors.js';
import styles from './CarCard.module.css';
import sprite from '../../assets/images/svg-icons-sprite.svg';

// Компонент для відображення картки автомобіля
const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.some(item => item.id === car.id);

  const handleToggleFavorite = () => {
    dispatch(addOrRemoveFromFavorites(car));
  };

  const formatMileage = mileage => {
    return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <div className={styles.card}>
      <img
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        className={styles.image}
      />
      <div className={styles.info}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {car.brand} <span className={styles.model}>{car.model}</span>,{' '}
            {car.year}
          </h3>
          <p className={styles.price}>${car.rentalPrice}</p>
        </div>
        <div className={styles.details}>
          <p>
            {car.address
              .split(', ')
              .slice(-2)
              .map((part, index, array) => (
                <span key={index} className={styles.inlineGroup}>
                  {part}
                  {index < array.length - 1 && (
                    <svg
                      className={styles.separatorIcon}
                      width="16"
                      height="14"
                    >
                      <use href={`${sprite}#icon-separator`} />
                    </svg>
                  )}
                </span>
              ))}
          </p>

          <p>
            {[
              car.rentalCompany,
              car.type,
              `${formatMileage(car.mileage)} km`,
            ].map((part, index, array) => (
              <span key={index} className={styles.inlineGroup}>
                {part}
                {index < array.length - 1 && (
                  <svg className={styles.separatorIcon} width="14" height="14">
                    <use href={`${sprite}#icon-separator`} />
                  </svg>
                )}
              </span>
            ))}
          </p>
        </div>

        <button
          onClick={handleToggleFavorite}
          className={styles.favoriteButton}
        >
          {isFavorite ? (
            <svg className={styles.icon} width="24" height="24">
              <use href={`${sprite}#icon-heart`} />
            </svg>
          ) : (
            <svg className={styles.iconTransparent} width="24" height="24">
              <use href={`${sprite}#icon-heart-transparent`} />
            </svg>
          )}
        </button>
        <Link to={`/catalog/${car.id}`} className={styles.learnMoreButton}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
