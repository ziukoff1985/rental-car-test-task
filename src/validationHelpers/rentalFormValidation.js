import * as Yup from "yup";

const rentalFormValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  bookingDate: Yup.date()
    .min(new Date(), "Date cannot be in the past")
    .required("Booking date is required"),
  comment: Yup.string(),
});

export default rentalFormValidationSchema;
