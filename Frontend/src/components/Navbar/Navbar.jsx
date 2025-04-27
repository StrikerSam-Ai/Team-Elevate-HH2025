import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useWeb3 } from '../../contexts/Web3Context';
import { Button } from '../Button';
import { PATHS } from '../../config/paths';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isConnected, address, connectWallet } = useWeb3();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="navbar">
      <Link to={PATHS.HOME} className="logo">ElderHub</Link>
      <div className="nav-links">
        {user ? (
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
              to={PATHS.JOURNAL} 
              className={location.pathname === PATHS.JOURNAL ? 'active' : ''}
            >
              Journal
            </Link>
            <Link 
              to={PATHS.PROFILE} 
              className={location.pathname === PATHS.PROFILE ? 'active' : ''}
            >
              Profile
            </Link>
            {!isConnected && (
              <Button 
                onClick={connectWallet}
                variant="secondary"
                size="small"
              >
                Connect Wallet
              </Button>
            )}
            {isConnected && (
              <span className="wallet-address" title={address}>
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            )}
            <Button 
              onClick={handleLogout} 
              variant="secondary"
              size="small"
            >
              Logout
            </Button>
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

export default Navbar;