import React, { useState, useEffect, useMemo } from 'react';

const formatCurrency = (amount) => {
  return `$${parseFloat(amount).toLocaleString(undefined, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};

const STORAGE_KEY = 'cryptoPortfolioHoldings';

const AssetPage = ({ coins }) => {
  const [holdings, setHoldings] = useState({}); 
  const [selectedCoinId, setSelectedCoinId] = useState('');
  const [inputAmount, setInputAmount] = useState('');

  useEffect(() => {
    const savedHoldings = localStorage.getItem(STORAGE_KEY);
    if (savedHoldings) {
      try {
        setHoldings(JSON.parse(savedHoldings));
      } catch (e) {
        console.error("Gagal memuat portfolio dari localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(holdings));
  }, [holdings]);


  const priceMap = useMemo(() => {
    return coins.reduce((acc, coin) => {
      acc[coin.id] = { 
          price: coin.current_price, 
          name: coin.name, 
          symbol: coin.symbol 
      };
      return acc;
    }, {});
  }, [coins]);
  
  const totalValue = useMemo(() => {
    return Object.entries(holdings).reduce((total, [id, data]) => {
      const priceData = priceMap[id];
      if (!priceData) return total;
      return total + (parseFloat(data.amount) * priceData.price);
    }, 0);
  }, [holdings, priceMap]);


  const handleAddAsset = (e) => {
    e.preventDefault();
    if (!selectedCoinId || !inputAmount || parseFloat(inputAmount) <= 0) return;

    const coinData = priceMap[selectedCoinId];
    if (!coinData) return;

    const newAmount = parseFloat(inputAmount);
    
    const existingHolding = holdings[selectedCoinId];
    
    const accumulatedAmount = existingHolding 
        ? existingHolding.amount + newAmount 
        : newAmount;

    setHoldings(prev => ({
      ...prev,
      [selectedCoinId]: {
        amount: accumulatedAmount,
        name: coinData.name,
        symbol: coinData.symbol
      }
    }));

    setSelectedCoinId('');
    setInputAmount('');
  };

  const handleRemoveAsset = (id) => {
    const newHoldings = { ...holdings };
    delete newHoldings[id];
    setHoldings(newHoldings);
  };
  
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '40px auto',
      padding: '30px', 
      backgroundColor: '#e6f7ff', 
      borderRadius: '8px', 
      border: '2px solid #91d5ff', 
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#0050b3' }}>💵 Halaman Asset Portfolio</h2>
      <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
        Total Nilai Portfolio: {formatCurrency(totalValue)}
      </p>

      <hr style={{ margin: '20px 0' }}/>
      
      <h4>➕ Tambah/Akumulasi Asset Baru</h4>
      <form onSubmit={handleAddAsset} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', marginBottom: '20px' }}>
        
        <div style={{ flex: 2 }}>
            <label>Pilih Koin</label>
            <select 
                value={selectedCoinId} 
                onChange={(e) => setSelectedCoinId(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
                <option value="">-- Pilih Koin --</option>
                {coins.map(coin => (
                    <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol.toUpperCase()})</option>
                ))}
            </select>
        </div>

        <div style={{ flex: 1 }}>
            <label>Jumlah</label>
            <input 
                type="number"
                placeholder="0.00"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                required
                min="0.00000001"
                step="any"
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
        </div>

        <button 
          type="submit" 
          style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', height: '36px' }}
        >
          Tambah
        </button>
      </form>
      
      
      <h4>My Holdings</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#bae7ff' }}>
            <th style={{ padding: '15px' }}>Coin</th>
            <th style={{ padding: '15px' }}>Jumlah</th>
            <th style={{ padding: '15px' }}>Nilai Saat Ini</th>
            <th style={{ padding: '15px' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(holdings).length === 0 && (
            <tr><td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>Belum ada aset. Tambahkan di atas!</td></tr>
          )}
          {Object.entries(holdings).map(([id, data]) => {
            const priceData = priceMap[id] || { price: 0 };
            const currentValue = priceData.price * data.amount;

            return (
              <tr key={id} style={{ borderBottom: '1px solid #d9d9d9' }}>
                <td style={{ padding: '10px' }}>{data.name} ({data.symbol.toUpperCase()})</td>
                <td style={{ padding: '10px' }}>{data.amount.toLocaleString(undefined, { maximumFractionDigits: 8 })}</td>
                <td style={{ padding: '10px' }}>{formatCurrency(currentValue)}</td>
                <td style={{ padding: '10px' }}>
                    <button 
                        onClick={() => handleRemoveAsset(id)}
                        style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Hapus
                    </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AssetPage;