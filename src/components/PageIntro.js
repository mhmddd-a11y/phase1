import React from 'react';

function PageIntro({ eyebrow, title, description }) {
  return <div className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="subheading">{description}</p></div>;
}

export default PageIntro;
