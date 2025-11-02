import React, { useState, useEffect, useCallback, useMemo } from 'react'; 
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import CryptoTable from './components/CryptoTable';
import FilterForm from './components/FilterForm';
import RefreshButton from './components/RefreshButton';

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  
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
  }, [fetchCoins]);
  
  const filteredCoins = useMemo(() => {
    return coins.filter(coin => 
      coin.current_price >= priceRange.min && coin.current_price <= priceRange.max
    );
  }, [coins, priceRange]);

  const handleDetailClick = (coinId) => {};
  if (error) {
    return <div className="container" style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
  }
  
  return (
    <div className="container">
      <Header />
      <div className="dashboard-layout">
        <div style={{ width: '300px' }}>
          <FilterForm setPriceRange={setPriceRange} /> 
        </div>
        <div className="main-content">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
            <RefreshButton 
              onClick={fetchCoins} 
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
    </div>
    
  );
}

export default App;