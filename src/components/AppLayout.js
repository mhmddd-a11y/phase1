import React from 'react';

const navGroups = [
  { label: 'YOUR SPACE', links: [{ id: 'home', icon: '⌂', label: 'Overview' }, { id: 'log', icon: '▤', label: 'Daily log' }] },
  { label: 'DISCOVER', links: [{ id: 'features', icon: '✳', label: 'Features' }, { id: 'about', icon: '♡', label: 'About HealthTrack' }, { id: 'contact', icon: '✉', label: 'Contact' }] },
];

function AppLayout({ children, page, pageName, goTo, menuOpen, setMenuOpen }) {
  return <div className="app-shell">
    {menuOpen && <button className="mobile-backdrop" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
    <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
      <button className="brand" onClick={() => goTo('home')}><span className="brand-mark">✳</span><span>health<span className="brand-light">track</span><small>YOUR DAILY WELLNESS</small></span></button>
      <nav className="side-nav" aria-label="Main navigation">
        {navGroups.map((group) => <React.Fragment key={group.label}>
          <span className={`nav-caption ${group.label === 'DISCOVER' ? 'nav-caption-spaced' : ''}`}>{group.label}</span>
          {group.links.map((link) => <button key={link.id} className={`nav-link ${page === link.id ? 'active' : ''}`} onClick={() => goTo(link.id)} aria-current={page === link.id ? 'page' : undefined}><span aria-hidden="true">{link.icon}</span>{link.label}</button>)}
        </React.Fragment>)}
      </nav>
      <div className="sidebar-bottom"><div className="profile"><span className="avatar">HT</span><div><strong>HealthTrack</strong><small>Wellness dashboard</small></div></div></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><button className="mobile-menu" aria-label="Open navigation" onClick={() => setMenuOpen(true)}>☰</button><div className="breadcrumb">HealthTrack <span>/</span> <strong>{pageName}</strong></div><div className="topbar-right"><span className="today-pill"><span /> Your wellness space</span><span className="top-avatar">HT</span></div></header>
      <div className="page-content">{children}</div>
      <footer className="footer"><span>HealthTrack · Everyday wellbeing</span><span><button onClick={() => goTo('about')}>About</button><button onClick={() => goTo('contact')}>Contact</button></span></footer>
    </main>
  </div>;
}

export default AppLayout;
