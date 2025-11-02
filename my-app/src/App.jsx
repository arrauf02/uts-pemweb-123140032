// src/App.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react'; 
import axios from 'axios';
import './App.css';

// Komponen
import Header from './components/Header'; 
import CoinDetail from './components/CoinDetail'; 
import DashboardPage from './components/DashboardPage'; 
import AssetPage from './components/AssetPage'; 

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard'); // State baru

  const fetchCoins = useCallback(async () => { /* ... (kode fetchCoins) ... */
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setCoins(response.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      setError("Gagal memuat data cryptocurrency. Coba periksa koneksi internet Anda.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);
  
  const filteredCoins = useMemo(() => {
    return coins.filter(coin => 
      coin.current_price >= priceRange.min && coin.current_price <= priceRange.max
    );
  }, [coins, priceRange]);
  
  const handleDetailClick = (coinId) => {
    setSelectedCoinId(coinId);
  };

  const handleCloseDetail = () => {
    setSelectedCoinId(null);
  };

  const renderPage = () => { // Fungsi Conditional Rendering Halaman
    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', padding: '40px' }}>{error}</div>;
    }
    
    if (currentPage === 'dashboard') {
      return (
        <DashboardPage 
            coins={coins}
            loading={loading}
            lastUpdated={lastUpdated}
            setPriceRange={setPriceRange}
            filteredCoins={filteredCoins}
            handleDetailClick={handleDetailClick}
            fetchCoins={fetchCoins}
        />
      );
    }
    
    if (currentPage === 'assets') {
      return <AssetPage coins={coins} />;
    }
    
    return <div style={{textAlign: 'center'}}>Halaman tidak ditemukan.</div>;
  };

  return (
    <div className="container">
      <Header /> 
      
      {/* Tombol Navigasi Sementara di App.jsx */}
      <div style={{ display: 'flex', gap: '15px', padding: '10px 0', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
          <button onClick={() => setCurrentPage('dashboard')} style={{ padding: '8px 15px', backgroundColor: currentPage === 'dashboard' ? '#FFD700' : '#f0f0f0' }}>Dashboard</button>
          <button onClick={() => setCurrentPage('assets')} style={{ padding: '8px 15px', backgroundColor: currentPage === 'assets' ? '#FFD700' : '#f0f0f0' }}>Assets</button>
      </div>

      {renderPage()}
      
      {/* CoinDetail Modal (Commit 8) */}
      {selectedCoinId && (
          <CoinDetail coinId={selectedCoinId} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default App;