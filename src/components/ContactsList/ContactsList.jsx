import { useSelector } from 'react-redux';

import {
  selectContactsFilter,
  selectContactsList,
} from '../../redux/contacts/selectors';

import Contact from '../Contact/Contact';

import css from '../ContactsList/ContactsList.module.css';

export default function ContactList() {
  const contacts = useSelector(selectContactsList);
  const filter = useSelector(selectContactsFilter);
  const visibleContacts = [
    ...contacts.filter(contact => contact.name.toLowerCase().includes(filter)),
  ];

  return (
    <ul className={css.list}>
      {visibleContacts.map(({ name, number, id }) => (
        <li key={id}>
          <Contact id={id} name={name} number={number} />
        </li>
      ))}
    </ul>
  );
}