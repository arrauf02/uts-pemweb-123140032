import React from 'react';
import FilterForm from './FilterForm'; 
import CryptoTable from './CryptoTable'; 
import RefreshButton from './RefreshButton'; 
import LoadingSpinner from './LoadingSpinner';

const DashboardPage = ({ loading, lastUpdated, setPriceRange, filteredCoins, handleDetailClick, fetchCoins, handleRefresh }) => {
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
};

export default DashboardPage;