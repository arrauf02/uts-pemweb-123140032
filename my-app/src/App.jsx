import React, { useState, useEffect, useCallback, useMemo } from 'react'; 
import axios from 'axios';
import './App.css';

import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import CryptoTable from './components/CryptoTable';
import FilterForm from './components/FilterForm';
import RefreshButton from './components/RefreshButton';
import AssetPage from './components/AssetPage';
import CoinDetail from './components/CoinDetail';

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedCoinId, setSelectedCoinId] = useState(null); 
  const [currentPage, setCurrentPage] = useState('dashboard'); 

  const fetchCoins = useCallback(async () => {
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
    const intervalId = setInterval(fetchCoins, 60000); 
    return () => clearInterval(intervalId);
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
  const handleRefresh = () => fetchCoins();

  const renderPage = () => {
    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', padding: '40px' }}>{error}</div>;
    }
    
    if (currentPage === 'dashboard') {
      return (
        <div className="dashboard-layout">
          <div style={{ width: '300px' }}>
              <FilterForm setPriceRange={setPriceRange} />
          </div>
          <div className="main-content">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
                <RefreshButton 
                    onClick={handleRefresh} 
                    loading={loading} 
                    lastUpdated={lastUpdated} 
                />
            </div>
            
            <h2>Market Overview</h2>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <CryptoTable coins={filteredCoins} handleDetailClick={handleDetailClick} />
            )}
          </div>
        </div>
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
      
      <div style={{ display: 'flex', gap: '15px', padding: '10px 0', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
          <button onClick={() => setCurrentPage('dashboard')} style={{ padding: '8px 15px', backgroundColor: currentPage === 'dashboard' ? '#FFD700' : '#f0f0f0' }}>Dashboard</button>
          <button onClick={() => setCurrentPage('assets')} style={{ padding: '8px 15px', backgroundColor: currentPage === 'assets' ? '#FFD700' : '#f0f0f0' }}>Assets</button>
      </div>

      {renderPage()}
      
      {selectedCoinId && (
          <CoinDetail 
              coinId={selectedCoinId} 
              onClose={handleCloseDetail} 
              coins={coins} 
          />
      )}
    </div>
  );
}

export default App;