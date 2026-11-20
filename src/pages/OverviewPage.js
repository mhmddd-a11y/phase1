import React from 'react';
import EntryRow from '../components/EntryRow';

function OverviewPage({ data, goTo, addWater }) {
  const movementCount = data.entries.filter((entry) => entry.type === 'movement').length;
  const meals = data.entries.filter((entry) => entry.type === 'meal').length;
  const waterPercent = Math.min((data.water / 2000) * 100, 100);
  const movementPercent = Math.min(movementCount * 100, 100);

  return (
    <div className="page-view">
      <div className="welcome-row simple-welcome">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Hello! <strong className="welcome-highlight">Your day at a glance.</strong></h1>
          <p className="subheading">Your wellness today.</p>
        </div>
        <button className="button button-primary" onClick={() => goTo('log')}>+ Add new entry</button>
      </div>

      <div className="metric-grid simple-metrics">
        <div className="metric-card simple-metric">
          <div className="metric-top"><div className="metric-icon mint" aria-hidden="true">🏃</div><div className="metric-label">MOVEMENT</div></div>
          <div className="metric-value">{movementCount} <small>sessions</small></div>
        </div>
        <div className="metric-card simple-metric">
          <div className="metric-top"><div className="metric-icon blue" aria-hidden="true">💧</div><div className="metric-label">WATER</div></div>
          <div className="metric-value">{(data.water / 1000).toFixed(1)} <small>of 2 litres</small></div>
        </div>
        <div className="metric-card simple-metric">
          <div className="metric-top"><div className="metric-icon peach" aria-hidden="true">🍽️</div><div className="metric-label">MEALS</div></div>
          <div className="metric-value">{meals} <small>logged</small></div>
        </div>
      </div>

      <div className="simple-grid">
        <div className="panel simple-panel">
          <div className="panel-heading"><div><p className="eyebrow">TODAY</p><h2>Daily goals</h2></div></div>
          <div className="simple-goal">
            <div><strong>Water</strong><div>{data.water} / 2,000 ml</div></div>
            <div className="water-progress"><div style={{ width: `${waterPercent}%` }} /></div>
          </div>
          <div className="simple-goal">
            <div><strong>Movement</strong><div>{movementCount} / 1 session</div></div>
            <div className="water-progress"><div style={{ width: `${movementPercent}%` }} /></div>
          </div>
          <button className="button button-secondary" onClick={addWater}>Add a glass of water · 250 ml</button>
        </div>

        <div className="panel simple-panel">
          <div className="panel-heading">
            <div><p className="eyebrow">LATEST</p><h2>Recent entries</h2></div>
            <button className="text-button" onClick={() => goTo('log')}>View all →</button>
          </div>
          <div className="entry-list">
            {data.entries.length ? data.entries.slice(0, 4).map((entry) => (
              <EntryRow entry={entry} key={entry.id} />
            )) : <p className="empty-state">Your entries will appear here.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
