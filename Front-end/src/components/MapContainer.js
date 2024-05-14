import React, { useState, useEffect } from 'react';

function MapContainer({ location }) {
    const apiKey = 'AIzaSyDy1qBS4RsKKWCsRZzyHNkJKManVhLh7M8'; // Your API key

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(false); // Simulate loading completion for demonstration purposes
        // You can remove this useEffect if you're not actually fetching data or performing any side effects
    }, []);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
                <iframe
                    width="100%"
                    height="200px"
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${location}`}
                ></iframe>
            )}
        </div>
    );
}

export default MapContainer;
