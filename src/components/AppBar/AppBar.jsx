import { useAuth } from '../../hooks/useAuth';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';

export default function AppBar() {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </div>
  )
}