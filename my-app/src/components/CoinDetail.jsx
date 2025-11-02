import React, { useMemo } from 'react';
import CoinChart from './CoinChart'; 

const formatCurrency = (amount) => {
  return `$${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
const formatPercentage = (amount) => {
  return `${parseFloat(amount).toFixed(2)}%`;
};
const formatLargeNumber = (num) => {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
  return num.toLocaleString();
};
const formatCoinDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

const CoinDetail = ({ coinId, onClose, coins }) => {
  
  const selectedCoin = useMemo(() => {
    return coins.find(coin => coin.id === coinId);
  }, [coins, coinId]);

  if (!selectedCoin) {
    return null;
  }
  
  const { 
    name, symbol, current_price, market_cap, price_change_percentage_24h, 
    image, high_24h, low_24h, total_volume, market_cap_rank, circulating_supply,
    ath, ath_date 
  } = selectedCoin;

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100 
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '10px', 
        width: '600px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        position: 'relative'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '1.2em', cursor: 'pointer' }}>
          X
        </button>
        
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={image} alt={name} style={{ height: '30px' }} />
          {name} ({symbol.toUpperCase()}) | Rank #{market_cap_rank}
        </h3>
        
        <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{formatCurrency(current_price)} 
          <span style={{ fontSize: '0.6em', color: price_change_percentage_24h > 0 ? 'green' : 'red', marginLeft: '10px' }}>
            ({formatPercentage(price_change_percentage_24h)})
          </span>
        </p>

        <hr style={{ margin: '15px 0' }} />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '15px', fontSize: '0.9em' }}>
            <div>
                <strong>Market Cap:</strong> {formatCurrency(market_cap)}<br/>
                <strong>Volume 24h:</strong> ${formatLargeNumber(total_volume)}<br/>
                <strong>Supply:</strong> {formatLargeNumber(circulating_supply)}
            </div>
            <div>
                <strong>High 24h:</strong> {formatCurrency(high_24h)}<br/>
                <strong>Low 24h:</strong> {formatCurrency(low_24h)}<br/>
            </div>
            <div style={{ borderLeft: '1px solid #eee', paddingLeft: '20px' }}>
                <strong>ATH:</strong> {formatCurrency(ath)}<br/>
                <strong>Tanggal ATH:</strong> {formatCoinDate(ath_date)}
            </div>
        </div>

        <CoinChart coinId={coinId} coinName={name} />
        
      </div>
    </div>
  );
};

export default CoinDetail;