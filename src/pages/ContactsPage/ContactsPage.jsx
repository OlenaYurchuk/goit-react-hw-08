import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectError, selectIsLoading } from '../../redux/contacts/selectors';
//import Section from '../../components/Section/Section';
import ContactForm from '../../components/ContactForm/ContactForm';
import Filter from '../../components/Filter/Filter';
import ContactList from '../../components/ContactsList/ContactsList';
import Modal from '../../components/Modal/Modal';
import css from '../ContactsPage/ContactsPage.module.css';

export default function ContactPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [isShowModalAddUser, setIsShowModalAddUser] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsShowModalAddUser(prev => !prev);
  };

  return (
    <div className={css.container}>
      <div>
        <div className={css.wrapper}>
          <h2 className={css.title}>Contacts</h2>
          <div className={css.filterWrap}>
            <Filter />
            <button className={css.button} type="button" onClick={handleOpenModal}>
              New Contact
            </button>
          </div>
        </div>
        {isLoading && !error && <b>Request in progress</b>}
        <ContactList />
      </div>
      {isShowModalAddUser && (
        <Modal onCloseModal={handleOpenModal}>
          <div>
            <h3 className={css.modalTitle}>Add new contact</h3>
            <ContactForm onCloseModal={handleOpenModal} />
          </div>
        </Modal>
      )}
    </div>
  );
}