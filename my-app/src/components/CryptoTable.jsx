import React from 'react';

const formatCurrency = (amount) => {
  return `$${parseFloat(amount).toLocaleString(undefined, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};

const formatPercentage = (amount) => {
  return `${parseFloat(amount).toFixed(2)}%`;
};

const CryptoTable = ({ coins, handleDetailClick }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#FFD700', color: '#333' }}>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>24h Change</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <tr 
              key={coin.id} 
              onClick={() => handleDetailClick(coin.id)}
              style={{ cursor: 'pointer' }} 
            >
              <td>{index + 1}</td>
              <td style={{ display: 'flex', alignItems: 'center' }}>
                <img src={coin.image} alt={coin.name} style={{ width: '24px', marginRight: '10px' }} />
                <strong>{coin.name}</strong> 
                <span style={{ marginLeft: '5px', color: '#666', fontSize: '0.8em' }}>{coin.symbol.toUpperCase()}</span>
              </td>
              <td>{formatCurrency(coin.current_price)}</td>
              <td>{formatCurrency(coin.market_cap)}</td>
              <td style={{ color: coin.price_change_percentage_24h > 0 ? 'green' : 'red' }}>
                {formatPercentage(coin.price_change_percentage_24h)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;