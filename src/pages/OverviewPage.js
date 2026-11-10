import React from 'react';
import EntryRow from '../components/EntryRow';

function OverviewPage({ data, goTo, addWater }) {
  const movementCount = data.entries.filter((entry) => entry.type === 'movement').length;
  const meals = data.entries.filter((entry) => entry.type === 'meal').length;
  const rawWaterPercent = data.water / 2000 * 100;
  const waterPercent = rawWaterPercent > 100 ? 100 : rawWaterPercent;
  const rawMovementPercent = movementCount / 1 * 100;
  const movementPercent = rawMovementPercent > 100 ? 100 : rawMovementPercent;

  return <>
    <div className="welcome-row simple-welcome"><div><p className="eyebrow">OVERVIEW</p><h1>Your day, <span>at a glance.</span></h1><p className="subheading">A simple snapshot of the habits you’re tracking.</p></div><button className="button button-primary" onClick={() => goTo('log')}>＋&nbsp; Add an entry</button></div>

    <div className="metric-grid simple-metrics">
      <article className="metric-card simple-metric"><span className="metric-label">MOVEMENT</span><div className="metric-value">{movementCount} <small>sessions</small></div></article>
      <article className="metric-card simple-metric"><span className="metric-label">WATER</span><div className="metric-value">{data.water / 1000} <small>of 2 litres</small></div></article>
      <article className="metric-card simple-metric"><span className="metric-label">MEALS</span><div className="metric-value">{meals} <small>logged</small></div></article>
    </div>

    <div className="simple-grid">
      <section className="panel simple-panel"><div className="panel-heading"><div><p className="eyebrow">TODAY</p><h2>Daily goals</h2></div></div>
        <div className="simple-goal"><div><strong>Water</strong><span>{data.water} / 2,000 ml</span></div><div className="water-progress"><span style={{ width: `${waterPercent}%` }} /></div></div>
        <div className="simple-goal"><div><strong>Movement</strong><span>{movementCount} / 1 session</span></div><div className="water-progress"><span style={{ width: `${movementPercent}%` }} /></div></div>
        <button className="button button-secondary" onClick={addWater}>Add a glass of water · 250 ml</button>
      </section>
      <section className="panel simple-panel"><div className="panel-heading"><div><p className="eyebrow">LATEST</p><h2>Recent entries</h2></div><button className="text-button" onClick={() => goTo('log')}>View all →</button></div>
        <div className="entry-list">{data.entries.length ? data.entries.filter((entry, index) => index < 4).map((entry) => <EntryRow entry={entry} key={entry.id} />) : <p className="empty-state">Your entries will appear here.</p>}</div>
      </section>
    </div>
  </>;
}

export default OverviewPage;
