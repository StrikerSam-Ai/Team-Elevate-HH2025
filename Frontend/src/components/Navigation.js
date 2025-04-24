import { Link, useLocation } from 'react-router-dom';
import { PATHS } from '../config/paths';

const Navigation = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <Link to={PATHS.HOME} className="logo">ElderHub</Link>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link 
              to={PATHS.DASHBOARD} 
              className={location.pathname === PATHS.DASHBOARD ? 'active' : ''}
            >
              Dashboard
            </Link>
            <Link 
              to={PATHS.COMMUNITY}
              className={location.pathname === PATHS.COMMUNITY ? 'active' : ''}
            >
              Community
            </Link>
            <Link 
              to={PATHS.EVENTS}
              className={location.pathname === PATHS.EVENTS ? 'active' : ''}
            >
              Events
            </Link>
            <Link 
              to={PATHS.PROFILE}
              className={location.pathname === PATHS.PROFILE ? 'active' : ''}
            >
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link 
              to={PATHS.LOGIN}
              className={location.pathname === PATHS.LOGIN ? 'active' : ''}
            >
              Login
            </Link>
            <Link 
              to={PATHS.REGISTER}
              className={location.pathname === PATHS.REGISTER ? 'active' : ''}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};