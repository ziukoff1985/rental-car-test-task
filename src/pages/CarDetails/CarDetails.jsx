import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  selectCurrentCar,
  selectIsLoading,
  selectIsError,
} from '../../redux/cars/selectors.js';
import { fetchCarByIdThunk } from '../../redux/cars/operations.js';
import RentalForm from '../../components/RentalForm/RentalForm.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import styles from './CarDetails.module.css';
import CarDetailsInfoComp from '../../components/CarDetailsInfoComp/CarDetailsInfoComp.jsx';

const CarDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector(selectCurrentCar);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    if (id) {
      dispatch(fetchCarByIdThunk(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      {isLoading && <Loader loading={isLoading} />}
      <div className={styles.container}>
        {isError && (
          <p className={styles.error}>
            Something went wrong, please try again later
          </p>
        )}
        {!car && !isLoading && <p className={styles.error}>Car not found</p>}
        {car && (
          <div className={styles.carDetailsContainer}>
            <div className={styles.leftColumn}>
              <img
                src={car.img}
                alt={`${car.brand} ${car.model}`}
                className={styles.image}
              />
              <RentalForm />
            </div>
            <CarDetailsInfoComp car={car} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
