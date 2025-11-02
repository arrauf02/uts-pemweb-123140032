import React from 'react';

const Header = () => {
  return (
    <header style={{ 
      textAlign: 'center', 
      padding: '20px', 
      backgroundColor: '#333', 
      color: '#FFD700', 
      borderRadius: '8px' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
        <img 
          src="/bitcoin.jpeg" 
          alt="Bitcoin Logo" 
          style={{ height: '40px' }} 
        />
        <h1>Cryptocurrency Tracker</h1>
        <img 
          src="/bitcoin.jpeg" 
          alt="Bitcoin Logo" 
          style={{ height: '40px' }} 
        />
      </div>
    </header>
  );
};

export default Header;