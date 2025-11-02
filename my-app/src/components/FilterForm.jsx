import React, { useState } from 'react';

const FilterForm = ({ setPriceRange }) => {
    const [minPrice, setMinPrice] = useState(0); 
    const [maxPrice, setMaxPrice] = useState(100000);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPriceRange({ min: parseFloat(minPrice), max: parseFloat(maxPrice) });
    };

    return (
        <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h3>Filter Harga</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="minPrice">Harga Minimum ($)</label>
              <input 
                id="minPrice"
                type="number" 
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                required 
                min="0"
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="maxPrice">Harga Maksimum ($)</label>
              <input 
                id="maxPrice"
                type="number" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                required 
                min="0"
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <button 
              type="submit" 
              style={{ padding: '8px 15px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              Terapkan Filter
            </button>
          </form>
        </div>
    );
};

export default FilterForm;