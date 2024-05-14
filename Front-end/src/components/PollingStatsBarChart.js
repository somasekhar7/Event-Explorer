import React from 'react';
import { Bar } from 'react-chartjs-2';

const PollingStatsBarChart = () => {
    const pollingStats = [
        { category: 'Category 1', artistName: 'Artist 1', state: 'State A', votes: 10 },
        { category: 'Category 2', artistName: 'Artist 2', state: 'State B', votes: 7 },
        { category: 'Category 1', artistName: 'Artist 3', state: 'State C', votes: 5 },
        // Add more data as needed
    ];

    const data = {
        labels: pollingStats.map(stat => `${stat.artistName} (${stat.state})`),
        datasets: [
            {
                label: 'Number of Votes',
                data: pollingStats.map(stat => stat.votes),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h1>Polling Stats Horizontal Bar Chart</h1>
            <Bar data={data} options={options} />
        </div>
    );
};

export default PollingStatsBarChart;
