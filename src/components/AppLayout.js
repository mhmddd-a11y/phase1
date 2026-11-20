import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function AppLayout({ children, page, goTo, menuOpen, setMenuOpen }) {
  return <div className="app-shell">
    {menuOpen && <button className="mobile-backdrop" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
    <div className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
      <Link className="brand" to="/" onClick={() => setMenuOpen(false)} aria-label="HealthTrack home">
        <div className="brand-mark" aria-hidden="true">✚</div>
        <div className="brand-copy">
          <div className="brand-name">health<div className="brand-light">track</div></div>
          <div className="brand-tagline">Everyday wellness</div>
        </div>
      </Link>
      <Navbar />
      <div className="sidebar-bottom"><div className="profile"><div className="avatar">HT</div><div><strong>HealthTrack</strong><small>Wellness dashboard</small></div></div></div>
    </div>
    <main className="main-area">
      <div className="page-content">{children}</div>
      <footer className="footer"><div>HealthTrack · Everyday wellbeing</div><div><button onClick={() => goTo('about')}>About</button><button onClick={() => goTo('contact')}>Contact</button></div></footer>
    </main>
  </div>;
}

export default AppLayout;
