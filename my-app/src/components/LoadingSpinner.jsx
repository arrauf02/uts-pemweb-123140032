import React from 'react';

const LoadingSpinner = ({ text = "Memuat data..." }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
};

export default LoadingSpinner;