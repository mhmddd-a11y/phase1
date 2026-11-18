import React, { useState } from 'react';
import EntryRow from '../components/EntryRow';

const categories = [
  { value: 'movement', label: 'Movement', icon: '↗' },
  { value: 'meal', label: 'Meals', icon: '◒' },
  { value: 'water', label: 'Water', icon: '◉' },
  { value: 'mood', label: 'Mood / mindfulness', icon: '☺' },
];

function DailyLogPage({ data, onAddEntry, addWater, onDeleteEntry, onUpdateEntry, notice }) {
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [form, setForm] = useState({ type: 'movement', title: '', detail: '' });
  const [formNotice, setFormNotice] = useState('');
  const waterPercent = Math.min(data.water / 2000 * 100, 100);
  const filledGlasses = Math.min(Math.floor(data.water / 250), 8);
  const visibleEntries = data.entries
    .filter((entry) => filter === 'all' || entry.type === filter)
    .sort((a, b) => sortOrder === 'newest' ? b.id - a.id : a.id - b.id);

  const handleSubmit = (event) => {
    const saved = onAddEntry(event, form);
    if (saved) {
      setForm({ type: 'movement', title: '', detail: '' });
      setFormNotice('Your entry has been added to today’s log.');
    }
  };

  return <div className="page-view">
    <div className="page-intro"><div className="page-intro-title"><span className="page-title-icon" aria-hidden="true">▦</span><h1>Daily log</h1></div><p className="subheading">Log meals, movement, and water.</p></div>
    {(notice || formNotice) && <div className="form-notice" role="status">✓ {formNotice || notice}</div>}
    <div className="detail-grid">
      <div className="panel form-panel">
        <div className="panel-heading">
          <div><p className="section-badge"><span aria-hidden="true">⊕</span>Add to your day</p><h2>Log a moment</h2></div>
          <span className="metric-icon mint" aria-hidden="true">⊕</span>
        </div>
        <form className="stacked-form" onSubmit={handleSubmit}>
          <div className="category-fieldset" role="group" aria-labelledby="category-label">
            <p className="category-label" id="category-label">What would you like to log?</p>
            <div className="category-selector" role="radiogroup" aria-label="Choose a log category">
              {categories.map(({ value, label, icon }) => <button
                type="button"
                role="radio"
                aria-checked={form.type === value}
                className={`category-option${form.type === value ? ' is-active' : ''}`}
                key={value}
                onClick={() => setForm({ ...form, type: value })}
              >
                <span className="category-option-icon" aria-hidden="true">{icon}</span>
                <span>{label}</span>
              </button>)}
            </div>
          </div>
          <label>Title<span className="input-with-icon"><span aria-hidden="true">✎</span><input required pattern=".*\\S.*" title="Enter a title with at least one non-space character." value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder={form.type === 'movement' ? 'e.g. Evening walk' : form.type === 'meal' ? 'e.g. Lunch' : form.type === 'water' ? 'e.g. Water break' : 'e.g. A quiet moment'} /></span></label>
          <label>Notes<span className="input-with-icon"><span aria-hidden="true">☰</span><input value={form.detail} onChange={(event) => setForm({ ...form, detail: event.target.value })} placeholder="A short description" /></span></label>
          <button className="button button-primary" type="submit"><span aria-hidden="true">✓</span>Save to today</button>
        </form>
      </div>

      <div className="panel form-panel water-card">
        <div className="panel-heading">
          <div><p className="section-badge section-badge-blue"><span aria-hidden="true">◉</span>Hydration</p><h2>Water check-in</h2></div>
          <span className="metric-icon blue" aria-hidden="true">◉</span>
        </div>
        <p className="form-description">A simple reminder to pause and take a sip.</p>
        <div className="water-big">{(data.water / 1000).toFixed(2)} <small>litres today</small></div>
        <div className="glass-grid" role="group" aria-label={`Water goal: ${filledGlasses} of 8 glasses`}>
          {Array.from({ length: 8 }, (_, index) => <button
            type="button"
            className={`glass-button${index < filledGlasses ? ' is-filled' : ''}`}
            aria-label={`Add glass ${index + 1}, 250 millilitres`}
            key={index}
            onClick={addWater}
          ><span aria-hidden="true">{index < filledGlasses ? '▰' : '▱'}</span></button>)}
        </div>
        <p className="small-text muted glass-caption">{filledGlasses} of 8 glasses · 250 ml each</p>
        <div className="water-progress" aria-label={`${Math.round(waterPercent)}% of daily water goal`} role="progressbar" aria-valuenow={Math.round(waterPercent)} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${waterPercent}%` }} /></div>
        <p className="small-text muted">{Math.round(waterPercent)}% of a 2 litre daily goal</p>
        <button className="button button-secondary" type="button" onClick={addWater}><span className="glass-add-icon" aria-hidden="true">▱<span>+</span></span>Add one glass · 250 ml</button>
        <p className="disclaimer">Your water goal is a general tracking target. Personal hydration needs vary.</p>
      </div>
    </div>

    <div className="panel log-panel">
      <div className="panel-heading">
        <div><p className="section-badge section-badge-sage"><span aria-hidden="true">☷</span>Your entries</p><h2>Today’s activity</h2></div>
        <div className="entry-count">{visibleEntries.length} {visibleEntries.length === 1 ? 'entry' : 'entries'}</div>
      </div>
      <div className="panel-heading log-controls">
        <label className="filter-label">Show <select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">Everything</option><option value="movement">Movement</option><option value="meal">Meals</option><option value="water">Water</option><option value="mood">Mood & mindfulness</option></select></label>
        <button type="button" className="text-button" onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}>Sort: {sortOrder === 'newest' ? 'Newest first' : 'Oldest first'} ↕</button>
      </div>
      <div className="entry-list">{visibleEntries.length ? visibleEntries.map((entry) => <EntryRow entry={entry} key={entry.id} onDelete={onDeleteEntry} onSave={onUpdateEntry} />) : <div className="empty-state"><span className="empty-state-icon" aria-hidden="true">☷</span><strong>Nothing logged here yet</strong><span>Choose a category above to add your first moment.</span></div>}</div>
    </div>
    <p className="disclaimer">HealthTrack is a personal organization tool, not medical advice or a substitute for care from a qualified professional.</p>
  </div>;
}

export default DailyLogPage;
