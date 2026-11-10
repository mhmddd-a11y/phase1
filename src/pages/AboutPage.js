import React from 'react';
import PageIntro from '../components/PageIntro';

function AboutPage() {
  return <><PageIntro eyebrow="ABOUT THE PROJECT" title="Wellness, without the pressure." description="HealthTrack is a student project exploring a thoughtful way to organize everyday wellness habits." /><section className="panel story-panel"><div className="story-mark">♡</div><div><p className="eyebrow">OUR IDEA</p><h2>Small moments are worth noticing.</h2><p>It can be hard to see how small daily choices add up. HealthTrack gives you a simple place to record movement, meals, and water so you can reflect on your routine at your own pace.</p><p>The goal is to make tracking feel encouraging and clear. There are no streaks or pressure—just a gentle overview of the habits you choose to record.</p></div></section><div className="values-grid"><div><strong>01</strong><h3>Keep it simple</h3><p>A clear interface makes it easier to focus on your day.</p></div><div><strong>02</strong><h3>Make it personal</h3><p>Your routine is yours. Track the things that matter to you.</p></div><div><strong>03</strong><h3>Build gently</h3><p>Consistency can start with one small moment.</p></div></div><p className="disclaimer">HealthTrack is for general wellness organization only. It does not diagnose, treat, or prevent health conditions.</p></>;
}

export default AboutPage;
