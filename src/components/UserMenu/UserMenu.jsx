import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { useAuth } from '../../hooks/useAuth';
import css from '../../components/UserMenu/userMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div>
          <p className={css.userName}>{user.name}</p>
          <p className={css.userEmail}>{user.email}</p>
        </div>
        <div className={css.userAvatar}></div>
      </div>
      <button className={css.btn} type="button" onClick={() => dispatch(logOut())}>
        LogOut
      </button>
    </div>
  );
}
