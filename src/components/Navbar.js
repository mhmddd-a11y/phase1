import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="side-nav" aria-label="Main navigation">
      <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/" end>Today</NavLink>
      <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/log">Log</NavLink>
      <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/features">Features</NavLink>
      <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/about">About</NavLink>
      <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/contact">Contact</NavLink>
    </nav>
  );
}

export default Navbar;
