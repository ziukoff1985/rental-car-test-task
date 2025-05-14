import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import styles from "./RentalForm.module.css";
import rentalFormValidationSchema from "../../validationHelpers/rentalFormValidation.js";

const RentalForm = () => {
  const initialValues = {
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  };

  const handleSubmit = (values) => {
    toast.success(
      `Rental request submitted: ${JSON.stringify(values, null, 2)}`,
      {
        duration: 6000,
      }
    );
  };

  return (
    <div className={styles.formSection}>
      <h3>Book your car now</h3>
      <p>Stay connected! We are always ready to help you.</p>
      <Formik
        initialValues={initialValues}
        validationSchema={rentalFormValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.rentalForm}>
          <Field
            type="text"
            name="name"
            placeholder="Name*"
            className={styles.input}
          />
          <ErrorMessage name="name" component="div" className={styles.error} />
          <Field
            type="email"
            name="email"
            placeholder="Email*"
            className={styles.input}
          />
          <ErrorMessage name="email" component="div" className={styles.error} />
          <Field type="date" name="bookingDate" className={styles.input} />
          <ErrorMessage
            name="bookingDate"
            placeholder="Booking Date"
            component="div"
            className={styles.error}
          />
          <Field
            as="textarea"
            name="comment"
            placeholder="Comment"
            className={styles.textarea}
          />
          <button type="submit" className={styles.rentalButton}>
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RentalForm;
