import React from 'react';

function PageIntro({ title, description }) {
  return <div className="page-intro"><h1>{title}</h1><p className="subheading">{description}</p></div>;
}

export default PageIntro;
