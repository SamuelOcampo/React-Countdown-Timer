import React from 'react';
import './Square.css';

function Square({ label, value }) {
  return (
    <div className="Square">
      <div className="Square__value">{value}</div>
      <div className="Square__label">{label}</div>
    </div>
  );
}

export default React.memo(Square);
