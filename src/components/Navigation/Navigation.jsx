// import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
//import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './Navigation.module.css';

export default function Navigation() {
  // const { isLoggedIn } = useSelector(selectIsLoggedIn);
  const { isLoggedIn } = useAuth();

  return (
    <>
      <NavLink className={css.logo} to="/">
        Phone<span>Book.</span>
      </NavLink>
      <navv className={css.nav}>
        {isLoggedIn && (
          <ul className={css.list}>
            <li className={css.listItem}>
              <NavLink className={css.link} to="/contacts">Contacts</NavLink>
            </li>
          </ul>
        )}
      </navv>
    </>
  );
}
