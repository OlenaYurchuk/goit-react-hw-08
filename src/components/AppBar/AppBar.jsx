import { useAuth } from '../../hooks/useAuth';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import LoggedNav from '../LoggedNav/LoggedNav';

export default function AppBar() {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <LoggedNav />}
    </div>
  )
}