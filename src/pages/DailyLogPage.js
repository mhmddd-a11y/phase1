import React, { useState } from 'react';
import EntryRow from '../components/EntryRow';
import Icon from '../components/Icon';
import PageIntro from '../components/PageIntro';

function DailyLogPage({ data, onAddEntry, addWater, notice }) {
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [form, setForm] = useState({ type: 'movement', title: '', detail: '' });
  const [formNotice, setFormNotice] = useState('');
  const rawWaterPercent = data.water / 2000 * 100;
  const waterPercent = rawWaterPercent > 100 ? 100 : rawWaterPercent;
  const visibleEntries = data.entries.filter((entry) => filter === 'all' || entry.type === filter).sort((a, b) => sortOrder === 'newest' ? b.id - a.id : a.id - b.id);

  const handleSubmit = (event) => {
    const saved = onAddEntry(event, form);
    if (saved) {
      setForm({ type: 'movement', title: '', detail: '' });
      setFormNotice('Your entry has been added to today’s log.');
    }
  };

  return <>
    <PageIntro eyebrow="YOUR DAILY PRACTICE" title="Daily log" description="Keep track of movement and meals in one simple place." />
    {(notice || formNotice) && <div className="form-notice" role="status">✓ {formNotice || notice}</div>}
    <div className="detail-grid">
      <section className="panel form-panel"><div className="panel-heading"><div><p className="eyebrow">ADD TO YOUR DAY</p><h2>Log a moment</h2></div><Icon>＋</Icon></div><form className="stacked-form" onSubmit={handleSubmit}>
        <label>What would you like to log?<select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}><option value="movement">Movement</option><option value="meal">Meal</option></select></label>
        <label>Title<input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder={form.type === 'movement' ? 'e.g. Evening walk' : 'e.g. Lunch'} /></label>
        <label>Notes<input value={form.detail} onChange={(event) => setForm({ ...form, detail: event.target.value })} placeholder="A short description" /></label>
        <button className="button button-primary" type="submit">Save to today</button>
      </form></section>
      <section className="panel form-panel water-card"><div className="panel-heading"><div><p className="eyebrow">HYDRATION</p><h2>Water check-in</h2></div><Icon tone="blue">◉</Icon></div><p className="form-description">A simple reminder to pause and take a sip. Your entries are saved in this browser.</p><div className="water-big">{data.water / 1000} <small>litres today</small></div><div className="water-progress"><span style={{ width: `${waterPercent}%` }} /></div><p className="small-text muted">{waterPercent}% of a 2 litre daily goal</p><button className="button button-secondary" onClick={addWater}>＋ Add one glass · 250 ml</button><p className="disclaimer">Your water goal is a general tracking target. Personal hydration needs vary.</p></section>
    </div>
    <section className="panel log-panel"><div className="panel-heading"><div><p className="eyebrow">YOUR ENTRIES</p><h2>Today’s activity</h2></div><span className="entry-count">{visibleEntries.length} entries</span></div><div className="panel-heading log-controls"><label className="filter-label">Show <select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">Everything</option><option value="movement">Movement</option><option value="meal">Meals</option><option value="water">Water</option></select></label><button className="text-button" onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}>Sort: {sortOrder === 'newest' ? 'Newest first' : 'Oldest first'} ↕</button></div><div className="entry-list">{visibleEntries.length ? visibleEntries.map((entry) => <EntryRow entry={entry} key={entry.id} />) : <p className="empty-state">No entries in this category yet. Add one above when you’re ready.</p>}</div></section>
    <p className="disclaimer">HealthTrack is a personal organization tool, not medical advice or a substitute for care from a qualified professional.</p>
  </>;
}

export default DailyLogPage;
