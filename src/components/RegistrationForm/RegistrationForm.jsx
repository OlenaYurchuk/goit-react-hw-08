import { Formik, Form, Field, ErrorMessage } from 'formik';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

export default function RegisterForm() {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        'Invalid name format'
      ),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        'Password must contain at least one letter and one number'
      ),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(register(values))
      .unwrap()
      .then(originalPromiseResult => {
        toast.success(`${originalPromiseResult.user.name} welcome!`);
      })
      .catch(() => {
        toast.error("Sorry, something's wrong");
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form autoComplete="off">
            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" placeholder="Enter name ..." />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" placeholder="Enter email ..." />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" placeholder="Enter password ..." />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" disabled={formik.isSubmitting}>Register</button>
            <div>Already have an account? <NavLink to="/login">LogIn</NavLink></div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
