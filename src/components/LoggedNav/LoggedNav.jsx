import { NavLink } from 'react-router-dom'
import css from '../LoggedNav/LoggedNav.module.css'
export default function LoggedNav() {
  return (
    <ul className={css.list}>
      <li className={css.listItem}>
        <NavLink to="login">LogIn</NavLink>
      </li>
      <li className={css.listItem}>
        <NavLink to="register">Registration</NavLink>
      </li>
    </ul>
  )
}