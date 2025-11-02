import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const formatCurrency = (amount) => {
  return `$${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const getChartLabels = (prices, period) => {
    const labels = prices.map(item => {
        const date = new Date(item[0]);
        if (period === 1) { 
            return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
        } else if (period === 365) { 
            return date.toLocaleDateString(undefined, { year: '2-digit', month: 'short' });
        } else {
            return date.toLocaleDateString(undefined, { day: '2-digit', month: 'short' });
        }
    });
    return labels;
};


const CoinChart = ({ coinId, coinName }) => { 
    const [chartData, setChartData] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState(7); 

    useEffect(() => {
        const fetchHistoricalData = async () => {
            if (!coinId) return;
            setLoading(true);
            try {
                const daysParam = period; 
                
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${daysParam}`);
                setChartData(response.data.prices); 
            } catch (error) {
                console.error("Gagal fetch data chart:", error);
                setChartData(null); 
            } finally {
                setLoading(false);
            }
        };
        fetchHistoricalData();
    }, [coinId, period]);
    
    let chartJsData = {};
    let chartOptions = {};

    if (chartData && chartData.length > 0) {
        const prices = chartData.map(item => item[1]);
        const labels = getChartLabels(chartData, period);

        chartJsData = {
            labels,
            datasets: [
                {
                    label: 'Harga (USD)',
                    data: prices,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.2)',
                    fill: true,
                    tension: 0.2
                },
            ],
        };
        
        chartOptions = {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: false },
            },
            scales: {
                x: { ticks: { maxTicksLimit: 8 } }, 
                y: { ticks: { callback: (value) => '$' + value.toFixed(period === 1 ? 4 : 2) } } 
            }
        };
    }
    
    return (
        <div style={{ padding: '10px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1em' }}>
                Grafik Harga ({period === 1 ? '24 Jam' : period === 7 ? '7 Hari' : period === 30 ? '1 Bulan' : '1 Tahun'})
            </h4>

            <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
                {[1, 7, 30, 365].map(p => (
                    <button 
                        key={p}
                        onClick={() => setPeriod(p)}
                        style={{
                            padding: '5px 10px', 
                            backgroundColor: p === period ? '#3498db' : '#f0f0f0',
                            color: p === period ? 'white' : '#333',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {p === 1 ? '1 Hari' : p === 7 ? '7 Hari' : p === 30 ? '1 Bulan' : '1 Tahun'}
                    </button>
                ))}
            </div>
            
            <div style={{ minHeight: '200px', width: '100%' }}>
                {loading && <div style={{height: '180px', display: 'grid', placeItems: 'center'}}>Loading Chart Data...</div>}
                
                {(!loading && chartData && chartData.length > 0) && (
                    <Line data={chartJsData} options={chartOptions} />
                )}

                {(!loading && (!chartData || chartData.length === 0)) && (
                    <div style={{height: '180px', display: 'grid', placeItems: 'center'}}>Data historis tidak tersedia untuk periode ini.</div>
                )}
            </div>
        </div>
    );
};

export default CoinChart;