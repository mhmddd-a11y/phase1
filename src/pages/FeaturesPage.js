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
  return <div className="page-view"><PageIntro title="A routine that fits real life." description="Tools for your daily wellness." /><div className="feature-grid">{features.map((feature) => <article className="panel feature-card" key={feature.title}><Icon tone={feature.tone}>{feature.icon}</Icon><h2>{feature.title}</h2><p>{feature.text}</p></article>)}</div></div>;
}

export default FeaturesPage;
