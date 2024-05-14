

import React, { useEffect, useState } from 'react';
import '../styles/weathercard.css';

const WeatherCard = () => {
    const [drops, setDrops] = useState([]);

    useEffect(() => {
        const createRaindrop = () => {
            const drop = {
                id: Math.random().toString(36).substr(2, 9), // Unique ID for each drop
                left: `${Math.random() * 100}%`, // Random horizontal position
                animationDuration: `${Math.random() * 1.5 + 0.5}s`, // Random duration for a more natural look
            };
            setDrops(prevDrops => [...prevDrops, drop]);

            // Remove the drop after animation completes
            setTimeout(() => {
                setDrops(prevDrops => prevDrops.filter(d => d.id !== drop.id));
            }, parseFloat(drop.animationDuration) * 1000);
        };

        const interval = setInterval(createRaindrop, 100); // Adjust the interval based on the density of raindrops

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="rain-container">
            {drops.map(drop => (
                <div
                    key={drop.id}
                    className="drop"
                    style={{
                        left: drop.left,
                        animationDuration: drop.animationDuration,
                    }}
                />
            ))}
        </div>
    );
};

export default WeatherCard;
