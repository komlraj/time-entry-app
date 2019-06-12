import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <Link className="logo" to="/">
            Time Entry
          </Link>
          <a className="logout" href="/logout">
            Logout
          </a>
        </nav>
      </header>
    </div>
  );
}

export default Header;
