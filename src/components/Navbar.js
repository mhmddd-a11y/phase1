import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="side-nav" aria-label="Main navigation">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/log">Log</Link>
      <Link className="nav-link" to="/features">Features</Link>
      <Link className="nav-link" to="/about">About</Link>
      <Link className="nav-link" to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;
