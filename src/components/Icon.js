import React from 'react';

function Icon({ children, tone = 'mint' }) {
  return <div className={`metric-icon ${tone}`} aria-hidden="true">{children}</div>;
}

export default Icon;
