import { useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/cars/selectors.js';
import { NavLink } from 'react-router-dom';
import sprite from '../../assets/images/icons.svg';
import styles from './ShowFavoritesButton.module.css';

const ShowFavoritesButton = () => {
  const favorites = useSelector(selectFavorites);

  // Відображаємо кнопку лише якщо є обрані авто
  if (favorites.length === 0) return null;

  return (
    <NavLink
      to="/favorites"
      className={({ isActive }) =>
        `${styles.btn} ${isActive ? styles.active : ''}`
      }
    >
      <svg width="13" height="13" className={styles.icon}>
        <use href={`${sprite}#icon-heart`} />
      </svg>
      Show Favorites {favorites.length > 0 && `(${favorites.length})`}
    </NavLink>
  );
};

export default ShowFavoritesButton;
