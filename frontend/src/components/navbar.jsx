import { useAuth } from '../hooks/useAuth';
import { useNavigate, NavLink } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handlelLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <nav>
      {user ? (
        <button onClick={handlelLogout}>logout {user.firstName}</button>
      ) : (
        <NavLink to="/login">
          Login
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
