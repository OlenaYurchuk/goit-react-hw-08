import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { selectContactsList } from '../../redux/contacts/selectors';
import { addContact } from '../../redux/contacts/operations';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import css from '../ContactForm/ContactForm.module.css';

export default function ContactForm({ onCloseModal }) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContactsList);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.number) {
      errors.number = 'Required';
    }
    return errors;
  };

  return (
    <div>
      <Toaster />
      <Formik
        initialValues={{ name: '', number: '' }}
        validate={validate}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const { name, number } = values;
          if (contacts.some((contact) => contact.name === name)) {
            toast.error(`${name} is already in contacts`);
            setSubmitting(false);
            return;
          }
          if (contacts.some((contact) => contact.number === number)) {
            toast.error(`${number} is already in contacts`);
            setSubmitting(false);
            return;
          }
          dispatch(addContact({ name, number }))
            .unwrap()
            .then((originalPromiseResult) => {
              toast.success(`${originalPromiseResult.name} successfully added to contacts`);
              onCloseModal();
              resetForm();
            })
            .catch(() => {
              toast.error("Sorry, something's wrong");
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <div>
              <Field
                type="text"
                name="name"
                placeholder="Enter name ..."
              />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <Field
                type="tel"
                name="number"
                placeholder="Enter number ..."
              />
              <ErrorMessage name="number" component="div" />
            </div>
            <button className={css.button} type="submit" disabled={isSubmitting}>
              New contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
