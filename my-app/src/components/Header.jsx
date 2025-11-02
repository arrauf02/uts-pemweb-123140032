// src/components/Header.jsx
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
        {/* Menggunakan tag img dan path relatif dari folder public/ */}
        <img 
          src="/bitcoin.png" 
          alt="Bitcoin Logo" 
          style={{ height: '40px' }} 
        />
        <h1>Cryptocurrency Tracker</h1>
        <img 
          src="/bitcoin.png" 
          alt="Bitcoin Logo" 
          style={{ height: '40px' }} 
        />
      </div>
    </header>
  );
};

export default Header;