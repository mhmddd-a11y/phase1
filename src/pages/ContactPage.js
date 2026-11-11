import React, { useState } from 'react';
import Icon from '../components/Icon';
import PageIntro from '../components/PageIntro';

function ContactPage() {
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const submitContact = (event) => {
    event.preventDefault();
    setSent(true);
  };
  const resetForm = () => {
    setSent(false);
    setContact({ name: '', email: '', message: '' });
  };

  return <div className="page-view"><PageIntro title="Get in touch." description="Send us your feedback." /><div className="panel contact-panel"><div className="contact-intro"><Icon>✉</Icon><p className="eyebrow">A NOTE TO THE TEAM</p><h2>Every good idea starts with a conversation.</h2><p>Your message will not be sent. This form is here so you can share your thoughts while using HealthTrack.</p></div>{sent ? <div className="contact-success"><Icon>✓</Icon><h2>Thanks, {contact.name || 'there'}.</h2><p>Your message has not been sent, but we appreciate you taking the time to share it.</p><button className="text-button" onClick={resetForm}>Write another message&nbsp; →</button></div> : <form className="stacked-form" onSubmit={submitContact}><label>Full name<input required value={contact.name} onChange={(event) => setContact({ ...contact, name: event.target.value })} placeholder="Your name" /></label><label>Email address<input required type="email" value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} placeholder="you@example.com" /></label><label>Message<textarea required rows="4" value={contact.message} onChange={(event) => setContact({ ...contact, message: event.target.value })} placeholder="What’s on your mind?" /></label><button type="submit" className="button button-primary">Send message&nbsp; →</button></form>}</div></div>;
}

export default ContactPage;
