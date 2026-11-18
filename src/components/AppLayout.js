import React from 'react';

const navLinks = [
  { id: 'home', icon: '⌂', label: 'Overview' },
  { id: 'log', icon: '☷', label: 'Log' },
  { id: 'features', icon: '✳', label: 'Features' },
  { id: 'about', icon: '♡', label: 'About' },
  { id: 'contact', icon: '✉', label: 'Contact' },
];

function AppLayout({ children, page, goTo, menuOpen, setMenuOpen }) {
  const renderNavLinks = (links) => links.map((link) => <button key={link.id} className={`nav-link ${page === link.id ? 'active' : ''}`} onClick={() => goTo(link.id)} aria-current={page === link.id ? 'page' : undefined}><div className="nav-icon" aria-hidden="true">{link.icon}</div>{link.label}</button>);

  return <div className="app-shell">
    {menuOpen && <button className="mobile-backdrop" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
    <div className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
      <button className="brand" onClick={() => goTo('home')} aria-label="HealthTrack home">
        <div className="brand-mark" aria-hidden="true">♥</div>
        <div className="brand-name">health<div className="brand-light">track</div></div>
      </button>
      <nav className="side-nav" aria-label="Main navigation">
        <div className="nav-group nav-group-left">{renderNavLinks(navLinks.slice(0, 2))}</div>
        <div className="nav-group nav-group-right">{renderNavLinks(navLinks.slice(2))}</div>
      </nav>
      <div className="sidebar-bottom"><div className="profile"><div className="avatar">HT</div><div><strong>HealthTrack</strong><small>Wellness dashboard</small></div></div></div>
    </div>
    <main className="main-area">
      <div className="page-content">{children}</div>
      <footer className="footer"><div>HealthTrack · Everyday wellbeing</div><div><button onClick={() => goTo('about')}>About</button><button onClick={() => goTo('contact')}>Contact</button></div></footer>
    </main>
  </div>;
}

export default AppLayout;
