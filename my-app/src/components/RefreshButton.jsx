import React from 'react';
import LoadingSpinner from './LoadingSpinner'; 

const RefreshButton = ({ onClick, loading, lastUpdated }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>
        Data terbaru: {lastUpdated ? lastUpdated.toLocaleTimeString() : 'N/A'}
      </p>
      <button 
        onClick={onClick} 
        disabled={loading}
        style={{ 
          padding: '10px 15px', 
          backgroundColor: '#FFD700', 
          color: '#333', 
          border: 'none', 
          borderRadius: '4px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {loading ? <LoadingSpinner text="Refreshing..." /> : "Refresh Data"}
      </button>
    </div>
  );
};

export default RefreshButton;