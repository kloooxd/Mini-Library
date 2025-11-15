import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-book"></i> Online Library
        </Link>
        
        <div className="navbar-nav ms-auto">
          {user ? (
            <>
              <Link className="nav-link" to="/books">
                <i className="fas fa-book-open"></i> Books
              </Link>
              {user.role === 'admin' && (
                <Link className="nav-link" to="/add-book">
                  <i className="fas fa-plus"></i> Add Book
                </Link>
              )}
              <span className="nav-link">
                <i className="fas fa-user"></i> Welcome, {user.name} ({user.role})
              </span>
              <button 
                className="btn btn-outline-light btn-sm ms-2" 
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
              <Link className="nav-link" to="/register">
                <i className="fas fa-user-plus"></i> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;