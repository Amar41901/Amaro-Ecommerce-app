import { Link, useLocation } from "react-router-dom";

import "../styles/Header.css";

function Header() {
  const location = useLocation();

  // Active link
  const isActive = (path) => {
    return location.pathname === path;
  };

  // User data
  const user = JSON.parse(localStorage.getItem("user"));

  const userName = user?.name;

  return (
    <header className="header">
      {/* Logo */}

      <div className="logo-section">
        <div className="logo">
          <img src="/assets/images/website-logo.webp" alt="Website Logo" />
        </div>

        <div className="brand-text">
          <h2>Amaro Store</h2>

          <p>Premium Ecommerce</p>
        </div>
      </div>

      {/* Navigation */}

      <nav className="navbar">
        <Link
          className={isActive("/") ? "nav-link active-link" : "nav-link"}
          to="/"
        >
          Dashboard
        </Link>

        <Link
          className={isActive("/cart") ? "nav-link active-link" : "nav-link"}
          to="/cart"
        >
          Cart
        </Link>

        <Link
          className={isActive("/login") ? "nav-link active-link" : "nav-link"}
          to="/login"
        >
          Login
        </Link>

        <Link
          className={isActive("/signin") ? "nav-link active-link" : "nav-link"}
          to="/signin"
        >
          Register
        </Link>
      </nav>

      {/* User Section */}

      <div className="header-user">
        <div className="header-avatar">{userName?.charAt(0) || "G"}</div>

        <div className="header-user-info">
          <h4>{userName || "Guest"}</h4>

          <p>Shopper</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
