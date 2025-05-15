import * as Yup from 'yup';

// Регулярний вираз для більш строгої перевірки email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const rentalFormValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .matches(
      emailRegex,
      'Invalid email format. Please include a valid domain (e.g. example.com)'
    )
    .email('Invalid email')
    .required('Email is required'),
  bookingDate: Yup.date()
    .nullable()
    .min(new Date(), 'Date cannot be in the past')
    .required('Booking date is required')
    .typeError('Invalid date format'),
  comment: Yup.string(),
});

export default rentalFormValidationSchema;
