import { Formik, Form, Field, ErrorMessage } from 'formik';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import css from '../LoginForm/LoginForm.module.css'

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
          <Form autoComplete="off" className={css.form}>
            <div>
              <label htmlFor="email" className={css.label}>Email</label>
              <Field className={css.input} type="email" id="email" name="email" placeholder="Enter email ..." />
              <ErrorMessage className={css.error} name="email" component="div" />
            </div>
            <div>
              <label className={css.label} htmlFor="password">Password</label>
              <Field className={css.input} type="password" id="password" name="password" placeholder="Enter password ..." />
              <ErrorMessage className={css.error} name="password" component="div" />
            </div>
            <button className={css.btn} type="submit" disabled={formik.isSubmitting}>Log In</button>
            <div>Do not have an account? <NavLink className={css.link} to="/register">Register</NavLink></div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
