import { Formik, Form, Field, ErrorMessage } from 'formik';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';

export default function LoginForm() {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
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
    dispatch(logIn(values))
      .unwrap()
      .then(originalPromiseResult => {
        toast.success(`${originalPromiseResult.user.name} welcome back!`);
      })
      .catch(() => {
        toast.error('Incorrect login or password');
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
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" placeholder="Enter email ..." />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" placeholder="Enter password ..." />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" disabled={formik.isSubmitting}>Log In</button>
            <div>Do not have an account? <NavLink to="/register">Register</NavLink></div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
