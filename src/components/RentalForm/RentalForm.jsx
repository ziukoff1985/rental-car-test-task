import { Formik, Form, Field, ErrorMessage } from 'formik';
import toast from 'react-hot-toast';

import { ToastFormNotification } from '../ToastFormNotification/ToastFormNotification.jsx';

import rentalFormValidationSchema from '../../validationHelpers/rentalFormValidation.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './RentalForm.module.css';
import { formatFormData } from '../../utils/formatData.js';

const RentalForm = () => {
  const initialValues = {
    name: '',
    email: '',
    bookingDate: null,
    comment: '',
  };

  // const handleSubmit = (values) => {
  //   toast.success(
  //     `Rental request submitted: ${JSON.stringify(
  //       {
  //         ...values,
  //         bookingDate: values.bookingDate
  //           ? values.bookingDate.toISOString().split("T")[0]
  //           : "",
  //       },
  //       null,
  //       2
  //     )}`,
  //     {
  //       duration: 4000,
  //     }
  //   );
  // };

  const handleSubmit = values => {
    // Форматуємо дані
    const formattedData = formatFormData(values);

    // Використовуємо переокремлений компонент для toast
    toast.success(
      <ToastFormNotification
        title="Rental request submitted:"
        data={formattedData}
      />,
      {
        duration: 5000,
        style: {
          background: '#3470ff',
          color: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          fontSize: '20px',
        },
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
        {({ setFieldValue, values }) => (
          <Form className={styles.rentalForm}>
            <Field
              type="text"
              name="name"
              placeholder="Name*"
              className={styles.input}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
            <Field
              type="email"
              name="email"
              placeholder="Email*"
              className={styles.input}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
            <DatePicker
              selected={values.bookingDate}
              onChange={date => setFieldValue('bookingDate', date)}
              placeholderText="Booking Date*"
              className={styles.input}
              dateFormat="MM/dd/yyyy"
            />
            <ErrorMessage
              name="bookingDate"
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
        )}
      </Formik>
    </div>
  );
};

export default RentalForm;
