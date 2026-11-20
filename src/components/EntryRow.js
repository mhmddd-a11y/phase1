import React, { useState } from 'react';

const entryTypes = {
  movement: { label: 'Movement', icon: '🏃' },
  meal: { label: 'Meal', icon: '🍽️' },
  water: { label: 'Water', icon: '💧' },
  mood: { label: 'Mood & mindfulness', icon: '🧘' },
};

function EntryRow({ entry, onDelete, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ title: entry.title, detail: entry.detail });
  const category = entryTypes[entry.type] || entryTypes.movement;
  const saveEdit = (event) => {
    event.preventDefault();
    if (!draft.title.trim()) return;
    onSave(entry.id, { ...draft, title: draft.title.trim() });
    setEditing(false);
  };

  return <div className={`entry-row entry-row-${entry.type}`}>
    <div className={`entry-icon ${entry.type}`} aria-hidden="true">{category.icon}</div>
    {editing ? <form className="entry-edit-form" onSubmit={saveEdit}>
      <input aria-label="Entry title" required pattern=".*\\S.*" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
      <input aria-label="Entry notes" value={draft.detail} onChange={(event) => setDraft({ ...draft, detail: event.target.value })} />
      <div className="entry-actions entry-edit-actions">
        <button type="submit" className="entry-action" aria-label="Save entry">✓</button>
        <button type="button" className="entry-action" aria-label="Cancel editing" onClick={() => setEditing(false)}>×</button>
      </div>
    </form> : <div className="entry-copy"><strong>{entry.title}</strong><div>{category.label}{entry.detail ? ` · ${entry.detail}` : ''}</div></div>}
    {!editing && <div className="entry-time"><div aria-hidden="true">◷</div>{entry.time || 'Just added'}</div>}
    {!editing && (onDelete || onSave) && <div className="entry-actions">
      {onSave && <button type="button" className="entry-action" aria-label={`Edit ${entry.title}`} onClick={() => { setDraft({ title: entry.title, detail: entry.detail }); setEditing(true); }}>✎</button>}
      {onDelete && <button type="button" className="entry-action entry-action-delete" aria-label={`Delete ${entry.title}`} onClick={() => onDelete(entry.id)}>⌫</button>}
    </div>}
  </div>;
}

export default EntryRow;
