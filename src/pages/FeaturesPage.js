import React from 'react';
import Icon from '../components/Icon';
import PageIntro from '../components/PageIntro';

function FeaturesPage() {
  const features = [
    { icon: '↗', tone: 'lilac', title: 'Movement log', text: 'Record everyday activity and see your active minutes build over time.' },
    { icon: '◉', tone: 'blue', title: 'Hydration check-ins', text: 'Add a glass of water with one tap and keep an eye on your daily total.' },
    { icon: '◒', tone: 'peach', title: 'Mindful meals', text: 'Note meals and small details that help you pay attention to your routine.' },
    { icon: '▤', tone: 'mint', title: 'Daily overview', text: 'See recent entries and progress in a single, responsive dashboard.' },
  ];
  return <><PageIntro eyebrow="SIMPLE TOOLS, THOUGHTFULLY MADE" title="A routine that fits real life." description="HealthTrack brings a few useful wellness habits into one calm, easy-to-use space." /><div className="feature-grid">{features.map((feature) => <article className="panel feature-card" key={feature.title}><Icon tone={feature.tone}>{feature.icon}</Icon><h2>{feature.title}</h2><p>{feature.text}</p></article>)}</div><p className="disclaimer">Your entries are stored in local browser storage on this device. This demo does not create accounts or sync data.</p></>;
}

export default FeaturesPage;
