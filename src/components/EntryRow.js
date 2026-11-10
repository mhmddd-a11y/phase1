import React from 'react';

function EntryRow({ entry }) {
  const icon = entry.type === 'movement' ? '↗' : entry.type === 'meal' ? '◒' : '◉';
  const typeLabel = entry.type === 'movement' ? 'Movement' : entry.type === 'meal' ? 'Meal' : 'Hydration';
  return <div className="entry-row">
    <span className={`entry-icon ${entry.type}`}>{icon}</span>
    <div className="entry-copy"><strong>{entry.title}</strong><span>{typeLabel} · {entry.detail}</span></div>
    <span className="entry-time">{entry.time || 'Just added'}</span>
  </div>;
}

export default EntryRow;
