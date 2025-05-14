import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  selectCurrentCar,
  selectIsLoading,
  selectIsError,
} from "../../redux/cars/selectors.js";
import { fetchCarByIdThunk } from "../../redux/cars/operations.js";
import RentalForm from "../RentalForm/RentalForm.jsx";
import Loader from "../Loader/Loader.jsx";
import styles from "./CarDetails.module.css";
import CarDetailsInfoComp from "../CarDetailsInfoComp/CarDetailsInfoComp.jsx";

const CarDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector(selectCurrentCar);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(fetchCarByIdThunk(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div className={styles.error}>Error: {isError}</div>;
  }

  if (!car) {
    return <div className={styles.error}>Car not found</div>;
  }

  return (
    <div className={styles.container}>
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
  );
};

export default CarDetails;
