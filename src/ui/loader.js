import React from 'react';

import './loader.css';

const Loader = props => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`} style={props.style}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Loader;
