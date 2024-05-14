import React, { useState, useEffect } from "react";
import { Doughnut, Pie, Line, Bar } from "react-chartjs-2";
import axios from "axios";

const OrganizerPollingStats = () => {
    const [pollData, setPollData] = useState(null);
    const [chartType, setChartType] = useState("pie");
    const [category, setCategory] = useState(""); // Default category
    const [categories, setCategories] = useState([]); // State to store categories
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories
                const categoriesResponse = await axios.get("/v1/categories");
                const fetchedCategories = categoriesResponse.data;
                setCategories(fetchedCategories);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchPollingStats = async () => {
            try {
                if (category) {
                    // Fetch polling stats based on the selected category
                    const categoryId = categories.find(cat => cat.name === category)?.id;
                    if (!categoryId) {
                        setError(new Error("Invalid category selected"));
                        return;
                    }
                    const pollingStatsResponse = await axios.get(`/v1/organiser/categories/polling-stats/${categoryId}`);
                    const fetchedPollData = pollingStatsResponse.data;

                    // Extract options and votes from the response
                    const options = fetchedPollData.map(item => item.artistName);
                    const votes = fetchedPollData.map(item => item.totalVotes);

                    setPollData({ options, votes });
                }
            } catch (error) {
                setError(error);
            }
        };
        fetchPollingStats();
    }, [category, categories]);

    let chartComponent;

    if (error) {
        chartComponent = <div>Error: {error.message}</div>;
    } else if (!pollData) {
        chartComponent = <div>Please select category...</div>;
    } else {
        const { options, votes } = pollData;
        const backgroundColors = [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
        ];
        chartComponent = (
            <div style={{ width: "50%", margin: "auto" }} className="mt-lg-5 pb-lg-5">
                {chartType === "pie" && <Pie data={{ labels: options, datasets: [{ data: votes, backgroundColor: backgroundColors }] }} />}
                {chartType === "doughnut" && <Doughnut data={{ labels: options, datasets: [{ data: votes, backgroundColor: backgroundColors }] }} />}
                {chartType === "line" && <Line data={{ labels: options, datasets: [{ data: votes, backgroundColor: backgroundColors }] }} />}
                {chartType === "bar" && <Bar data={{ labels: options, datasets: [{ data: votes, backgroundColor: backgroundColors }] }} />}
            </div>
        );
    }

    return (
        <div className="pb-lg-5 mt-lg-4">
            <h2>User Polling Statistics</h2>
            <div className="mt-lg-5">
                <label htmlFor="chartType">Select Chart Type: </label>
                <select
                    id="chartType"
                    value={chartType}
                    onChange={(event) => setChartType(event.target.value)}
                >
                    <option value="pie">Pie Chart</option>
                    <option value="doughnut">Doughnut Chart</option>
                    <option value="line">Line Chart</option>
                    <option value="bar">Bar Graph</option>
                </select>
                <label htmlFor="category">Select Category: </label>
                <select id="category" value={category} onChange={(event) => setCategory(event.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
            </div>
            {chartComponent}
        </div>
    );
};

export default OrganizerPollingStats;
