import React, { useState, useMemo } from 'react';

const formatCurrency = (amount) => {
  return `$${parseFloat(amount).toLocaleString(undefined, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};

const AssetPage = ({ coins }) => { 
  const [holdings, setHoldings] = useState({}); 

  const priceMap = useMemo(() => {
    return coins.reduce((acc, coin) => {
      acc[coin.id] = coin.current_price;
      return acc;
    }, {});
  }, [coins]);

  const totalValue = useMemo(() => {
    return Object.entries(holdings).reduce((total, [id, amount]) => {
      const price = priceMap[id] || 0;
      return total + (parseFloat(amount) * price);
    }, 0);
  }, [holdings, priceMap]);

  const handleHoldingChange = (id, amount) => {
    setHoldings(prev => ({
      ...prev,
      [id]: amount,
    }));
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

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#bae7ff' }}>
            <th style={{ padding: '15px' }}>Coin</th>
            <th style={{ padding: '15px' }}>Jumlah</th>
            <th style={{ padding: '15px' }}>Nilai Saat Ini</th>
          </tr>
        </thead>
        <tbody>
          {coins.slice(0, 5).map(coin => ( 
            <tr key={coin.id} style={{ borderBottom: '1px solid #d9d9d9' }}>
              <td style={{ padding: '10px' }}>{coin.name}</td>
              <td style={{ padding: '10px' }}>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  onChange={(e) => handleHoldingChange(coin.id, e.target.value)}
                  style={{ width: '100px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </td>
              <td style={{ padding: '10px' }}>
                {formatCurrency(priceMap[coin.id] * parseFloat(holdings[coin.id] || 0))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetPage;