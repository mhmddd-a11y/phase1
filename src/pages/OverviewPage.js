import React from 'react';
import EntryRow from '../components/EntryRow';

function OverviewPage({ data, goTo, addWater }) {
  const movementCount = data.entries.filter((entry) => entry.type === 'movement').length;
  const meals = data.entries.filter((entry) => entry.type === 'meal').length;
  const rawWaterPercent = data.water / 2000 * 100;
  const waterPercent = rawWaterPercent > 100 ? 100 : rawWaterPercent;
  const rawMovementPercent = movementCount / 1 * 100;
  const movementPercent = rawMovementPercent > 100 ? 100 : rawMovementPercent;

  return <div className="page-view">
    <div className="welcome-row simple-welcome"><div><p className="eyebrow">OVERVIEW</p><h1>Hello! <strong className="welcome-highlight">Your day at a glance.</strong></h1><p className="subheading">Your wellness today.</p></div><button className="button button-primary" onClick={() => goTo('log')}>＋&nbsp; Add new entry</button></div>

    <div className="metric-grid simple-metrics">
      <div className="metric-card simple-metric"><div className="metric-label">MOVEMENT</div><div className="metric-value">{movementCount} <small>sessions</small></div></div>
      <div className="metric-card simple-metric"><div className="metric-label">WATER</div><div className="metric-value">{(data.water / 1000).toFixed(1)} <small>of 2 litres</small></div></div>
      <div className="metric-card simple-metric"><div className="metric-label">MEALS</div><div className="metric-value">{meals} <small>logged</small></div></div>
    </div>

    <div className="simple-grid">
      <div className="panel simple-panel"><div className="panel-heading"><div><p className="eyebrow">TODAY</p><h2>Daily goals</h2></div></div>
        <div className="simple-goal"><div><strong>Water</strong><div>{data.water} / 2,000 ml</div></div><div className="water-progress"><div style={{ width: `${waterPercent}%` }} /></div></div>
        <div className="simple-goal"><div><strong>Movement</strong><div>{movementCount} / 1 session</div></div><div className="water-progress"><div style={{ width: `${movementPercent}%` }} /></div></div>
        <button className="button button-secondary" onClick={addWater}>Add a glass of water · 250 ml</button>
      </div>
      <div className="panel simple-panel"><div className="panel-heading"><div><p className="eyebrow">LATEST</p><h2>Recent entries</h2></div><button className="text-button" onClick={() => goTo('log')}>View all →</button></div>
        <div className="entry-list">{data.entries.length ? data.entries.filter((entry, index) => index < 4).map((entry) => <EntryRow entry={entry} key={entry.id} />) : <p className="empty-state">Your entries will appear here.</p>}</div>
      </div>
    </div>
  </div>;
}

export default OverviewPage;
