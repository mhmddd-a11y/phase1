import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import AppLayout from './components/AppLayout';
import OverviewPage from './pages/OverviewPage';
import DailyLogPage from './pages/DailyLogPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const STORAGE_KEY = 'healthtrack-data-v1';
const WATER_GLASS_ML = 250;
const initialData = {
  water: 1250,
  entries: [
    { id: 1, type: 'movement', title: 'Morning walk', detail: 'A refreshing walk around the neighborhood' },
    { id: 2, type: 'meal', title: 'Breakfast', detail: 'Oatmeal, banana and a cup of tea' },
    { id: 3, type: 'water', title: 'Water break', detail: 'A glass of water', waterMl: WATER_GLASS_ML },
  ],
};

function readSavedData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return initialData;

  const data = JSON.parse(saved);
  return {
    ...data,
    entries: data.entries.map((entry) => (
      entry.type === 'water' && !entry.waterMl
        ? { ...entry, waterMl: WATER_GLASS_ML }
        : entry
    )),
  };
}

function getNextId(entries) {
  let largestId = 0;
  for (const entry of entries) {
    if (entry.id > largestId) largestId = entry.id;
  }
  return largestId + 1;
}

function AppContent() {
  const [data, setData] = useState(readSavedData);
  const [notice, setNotice] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const goTo = (nextPage) => {
    const paths = { home: '/', log: '/log', features: '/features', about: '/about', contact: '/contact' };
    navigate(paths[nextPage] || '/');
    setNotice('');
  };

  const addEntry = (event, form) => {
    event.preventDefault();
    const title = form.title.trim();
    if (!title) return false;
    const defaultDetails = {
      movement: 'Movement session',
      meal: 'Daily meal',
      water: `A glass of water · ${WATER_GLASS_ML} ml`,
      mood: 'Mindfulness moment',
    };
    const waterMl = form.type === 'water' ? WATER_GLASS_ML : 0;
    const entry = {
      type: form.type,
      title,
      detail: form.detail.trim() || defaultDetails[form.type],
      ...(waterMl ? { waterMl } : {}),
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    };
    setData((current) => {
      const nextEntry = { ...entry, id: getNextId(current.entries) };
      return {
        ...current,
        water: current.water + waterMl,
        entries: [nextEntry, ...current.entries],
      };
    });
    setNotice(waterMl ? `${WATER_GLASS_ML} ml added to your water total.` : 'Your entry has been added to today’s log.');
    return true;
  };

  const addWater = () => {
    setData((current) => {
      const entry = {
        id: getNextId(current.entries),
        type: 'water', title: 'Water break', detail: 'A glass of water',
        waterMl: WATER_GLASS_ML,
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      };
      return { ...current, water: current.water + WATER_GLASS_ML, entries: [entry, ...current.entries] };
    });
    setNotice(`${WATER_GLASS_ML} ml added to your water total.`);
  };

  const deleteEntry = (entryId) => {
    setData((current) => {
      const deletedEntry = current.entries.find((entry) => entry.id === entryId);
      const waterToRemove = deletedEntry ? deletedEntry.waterMl || 0 : 0;
      return {
        ...current,
        water: Math.max(0, current.water - waterToRemove),
        entries: current.entries.filter((entry) => entry.id !== entryId),
      };
    });
  };

  const updateEntry = (entryId, changes) => {
    setData((current) => ({
      ...current,
      entries: current.entries.map((entry) => entry.id === entryId ? { ...entry, ...changes } : entry),
    }));
  };

  const currentPage = location.pathname === '/' ? 'home' : location.pathname.slice(1);

  return <AppLayout goTo={goTo}>
    {notice && currentPage !== 'log' && <div className="form-notice" role="status">✓ {notice}</div>}
    <Routes>
      <Route path="/" element={<OverviewPage data={data} goTo={goTo} addWater={addWater} />} />
      <Route path="/log" element={<DailyLogPage data={data} onAddEntry={addEntry} addWater={addWater} onDeleteEntry={deleteEntry} onUpdateEntry={updateEntry} notice={notice} />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </AppLayout>;
}

function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}

export default App;
