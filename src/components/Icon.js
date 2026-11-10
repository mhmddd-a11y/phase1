import React from 'react';

function Icon({ children, tone = 'mint' }) {
  return <span className={`metric-icon ${tone}`} aria-hidden="true">{children}</span>;
}

export default Icon;
