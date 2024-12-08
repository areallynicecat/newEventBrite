import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx"; 
import '../styles/navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  // Conditionally render links based on user role
  const renderLinks = () => {
    if (!user) {
      return (
        <>
            <li><Link to="/" className="navbar-link">Explore</Link></li>  
        </>
      );
    }

    switch (user.role) {
      case "admin":
        return (
          <>
            <li><Link to="/" className="navbar-link">Explore</Link></li>
            <li><Link to="/users" className="navbar-link">Users</Link></li>
            <li><Link to="/event-management" className="navbar-link">Events</Link></li>
            <li><Link to="/analytics" className="navbar-link">Analytics</Link></li>
          </>
        );
      case "attendee":
        return (
          <>
            <li><Link to="/" className="navbar-link">Explore</Link></li>
          </>
        );
      case "organizer":
        return (
          <>
            <li><Link to="/" className="navbar-link">Explore</Link></li>
            <li><Link to="/my-events" className="navbar-link">My Events</Link></li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">EventBrite</h1>
        <ul className="navbar-links">
          {renderLinks()}
        </ul>
      </div>

      <div className="navbar-center">
        <input type="text" className="search-input" placeholder="Search..." />
        <button className="search-btn">Search</button>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/profile" className="link-width-100">
              <button className="user-btn">{user.username}</button>
            </Link>
            <Link to="/" className="link-width-100">
              <button className="register-btn" onClick={logout}>Logout</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="link-width-100">
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/register" className="link-width-100">
              <button className="register-btn" onClick={logout}>Register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
