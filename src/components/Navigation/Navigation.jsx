import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import css from '../Navigation/Navigation.module.css';

export default function Navigation() {
  const { isLoggedIn } = useAuth();

  return (
    <div className={css.container}>
      <NavLink className={css.logo} to="/">
        Phone<span>Book</span>
      </NavLink>
      <nav className={css.nav}>
        {isLoggedIn && (
          <ul className={css.list}>
            <li className={css.listItem}>
              <NavLink className={css.link} to="/contacts">Contacts</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}
