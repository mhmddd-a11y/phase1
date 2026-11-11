import React from 'react';

function EntryRow({ entry }) {
  const icon = entry.type === 'movement' ? '↗' : entry.type === 'meal' ? '◒' : '◉';
  const typeLabel = entry.type === 'movement' ? 'Movement' : entry.type === 'meal' ? 'Meal' : 'Hydration';
  return <div className="entry-row">
    <div className={`entry-icon ${entry.type}`}>{icon}</div>
    <div className="entry-copy"><strong>{entry.title}</strong><div>{typeLabel} · {entry.detail}</div></div>
    <div className="entry-time">{entry.time || 'Just added'}</div>
  </div>;
}

export default EntryRow;
