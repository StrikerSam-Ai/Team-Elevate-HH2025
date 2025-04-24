import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="nav-brand">Elevate</div>
            <div className="nav-links">
                <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                    Dashboard
                </Link>
                <Link to="/community" className={location.pathname === "/community" ? "active" : ""}>
                    Community
                </Link>
                <Link to="/groups" className={location.pathname === "/groups" ? "active" : ""}>
                    Groups
                </Link>
                <Link to="/events" className={location.pathname === "/events" ? "active" : ""}>
                    Events
                </Link>
                <Link to="/chatbot" className={location.pathname === "/chatbot" ? "active" : ""}>
                    Chat
                </Link>
                <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>
                    Profile
                </Link>
            </div>
        </nav>
    );
};

export default Navigation;