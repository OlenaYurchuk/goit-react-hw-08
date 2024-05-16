import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import { FaUser } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import css from '../Contact/Contact.module.css';

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();

  const handleDeleteContact = userId => {
    dispatch(deleteContact(userId))
      .unwrap()
      .then(originalPromiseResult => {
        toast.success(
          `${originalPromiseResult.name} successfully deleted from contacts`
        );
      })
      .catch(() => {
        toast.error("Sorry, something's wrong");
      });
  };

  return (
    <div className={css.wrap}>
      <Toaster />
      <div className={css.content}>
        <p className={css.name}>
          <FaUser />
          {name}
        </p>
        <p className={css.number}>
          <FaPhone />
          {number}
        </p>
      </div>
      <button className={css.btn} onClick={() => handleDeleteContact(id)}>
        Delete
      </button>
    </div>
  );
}