// src/components/DashboardPage.jsx
import React from 'react';
import FilterForm from './FilterForm'; 
import CryptoTable from './CryptoTable'; 
import RefreshButton from './RefreshButton'; 

const DashboardPage = ({ coins, loading, lastUpdated, setPriceRange, filteredCoins, handleDetailClick, fetchCoins }) => {
    return (
        <div className="dashboard-layout">
            {/* Area Sidebar/Filter */}
            <div style={{ width: '300px' }}>
                <FilterForm setPriceRange={setPriceRange} /> 
            </div>
            
            {/* Area Konten Utama */}
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
                    <div style={{textAlign: 'center', padding: '50px'}}><p>Loading data...</p></div>
                ) : (
                    <CryptoTable coins={filteredCoins} handleDetailClick={handleDetailClick} />
                )}
            </div>
        </div>
    );
};

export default DashboardPage;