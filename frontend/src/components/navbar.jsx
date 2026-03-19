import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, Search, LogOut } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom'; // 1. Use SPA Links
import { useAuth } from '../hooks/useAuth'; // 2. Connect your Logic
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // 3. Get Auth State
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  // Senior Move: Helper for active styling
  const navClass = ({ isActive }) =>
    `transition ${isActive ? 'text-primary font-bold border-b-2 border-primary' : 'text-muted hover:text-primary'}`;

  const mobileNavClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition ${isActive ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-gray-100'}`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <h1 className="text-2xl font-bold text-primary hidden sm:block">
              KING CO MERCE
            </h1>
          </Link>

          {/* Desktop Menu (Now with NavLinks) */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>
            <NavLink to="/shop" className={navClass}>
              Products
            </NavLink>
            {/* Show Admin Dashboard only if user is Admin */}
            {user?.isAdmin && (
              <NavLink to="/admin" className={navClass}>
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button className="text-muted hover:text-primary transition">
              <Search size={20} />
            </button>

            {/* IDENTITY LOGIC: Show Name/Logout if logged in, else User Icon */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="hidden sm:inline text-sm font-medium text-primary">
                  Hi, {user.firstName}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-muted hover:text-red-500 transition"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-muted hover:text-primary transition"
              >
                <User size={20} />
              </Link>
            )}

            <button className="relative text-muted hover:text-primary transition">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 text-xs font-bold text-white rounded-full w-5 h-5 flex items-center justify-center bg-success">
                0
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden text-muted">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu (Now Functional) */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-surface">
            <NavLink to="/" end className={mobileNavClass} onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink to="/shop" className={mobileNavClass} onClick={toggleMenu}>
              Products
            </NavLink>
            {!user && (
              <NavLink
                to="/login"
                className={mobileNavClass}
                onClick={toggleMenu}
              >
                Login
              </NavLink>
            )}
            {user?.isAdmin && (
              <NavLink
                to="/admin"
                className={mobileNavClass}
                onClick={toggleMenu}
              >
                Dashboard
              </NavLink>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
