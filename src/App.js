import React, { useEffect, useState } from 'react';
import './App.css';
import AppLayout from './components/AppLayout';
import OverviewPage from './pages/OverviewPage';
import DailyLogPage from './pages/DailyLogPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const STORAGE_KEY = 'healthtrack-data-v1';
const initialData = {
  water: 1250,
  entries: [
    { id: 1, type: 'movement', title: 'Morning walk', detail: 'A refreshing walk around the neighborhood' },
    { id: 2, type: 'meal', title: 'Breakfast', detail: 'Oatmeal, banana and a cup of tea' },
    { id: 3, type: 'water', title: 'Water break', detail: 'A glass of water' },
  ],
};

function readSavedData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : initialData;
}

function getNextId(entries) {
  let largestId = 0;
  for (const entry of entries) {
    if (entry.id > largestId) largestId = entry.id;
  }
  return largestId + 1;
}

function App() {
  const [data, setData] = useState(readSavedData());
  const [page, setPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const goTo = (nextPage) => {
    setPage(nextPage);
    setMenuOpen(false);
    setNotice('');
  };

  const addEntry = (event, form) => {
    event.preventDefault();
    if (!form.title) return;
    const entry = {
      type: form.type,
      title: form.title,
      detail: form.detail || (form.type === 'movement' ? 'Movement session' : 'Daily meal'),
    };
    setData((current) => {
      const nextEntry = { ...entry, id: getNextId(current.entries) };
      return { ...current, entries: [nextEntry, ...current.entries] };
    });
    setNotice('Your entry has been added to today’s log.');
    return true;
  };

  const addWater = () => {
    setData((current) => {
      const entry = {
        id: getNextId(current.entries),
        type: 'water', title: 'Water break', detail: 'A glass of water',
      };
      return { ...current, water: current.water + 250, entries: [entry, ...current.entries] };
    });
    setNotice('250 ml added to your water total.');
  };

  const currentPage = ['home', 'log', 'features', 'about', 'contact'].includes(page) ? page : 'home';
  const pages = {
    home: <OverviewPage data={data} goTo={goTo} addWater={addWater} />,
    log: <DailyLogPage data={data} onAddEntry={addEntry} addWater={addWater} notice={notice} />,
    features: <FeaturesPage />,
    about: <AboutPage />,
    contact: <ContactPage />,
  };

  return <AppLayout page={currentPage} goTo={goTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
    {notice && currentPage !== 'log' && <div className="form-notice" role="status">✓ {notice}</div>}
    {pages[currentPage]}
  </AppLayout>;
}

export default App;
