import { useDispatch, useSelector } from 'react-redux';
import { setContactsFilter } from '../../redux/contacts/filters';
import { selectContactsFilter } from '../../redux/contacts/selectors';
import css from '../Filter/Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(selectContactsFilter);

  const handleChangeFilter = ({ currentTarget: { value } }) => {
    const normalizedValue = value.toLowerCase().trim();
    dispatch(setContactsFilter(normalizedValue));
  };

  return (
    <label className={css.label}>
      <input
        className={css.input}
        type="text"
        name="filter"
        placeholder="Enter contact name"
        value={filter}
        onChange={handleChangeFilter}
      />
    </label>
  );
}