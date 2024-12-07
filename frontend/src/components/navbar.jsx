import React, { useContext } from "react";
import { Link } from "react-router-dom"; 
import { AuthContext } from "../context/authContext.jsx"; 
import '../styles/navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext); 

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">EventBrite</h1>
        <ul className="navbar-links">
          <li>
            <Link to="/explore" className="navbar-link">Explore</Link>
          </li>
          <li>
            <Link to="/events" className="navbar-link">Artist Bookings</Link>
          </li>
          <li>
            <Link to="/event-management" className="navbar-link">Event Management</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-center">
        <input type="text" className="search-input" placeholder="Search..." />
        <button className="search-btn">Search</button>
      </div>

      <div className="navbar-right">
        {user ? (
          <div>
            <span className="user-greeting">Hello, {user.username}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="register-btn">Register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
