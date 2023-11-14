import * as yup from 'yup';

const validationSchema = yup.object({
   fullName: yup.string().required('Fullname is a required field'),
   email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is a required field'),
   phoneNumber: yup.number().required('Phone number is a required field'),
   username: yup.string().required('Username is a required field'),
   password: yup.string().required('Password is a required field'),
});

export default validationSchema;
