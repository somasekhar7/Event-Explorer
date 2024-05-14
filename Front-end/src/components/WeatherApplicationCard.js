import React, { useEffect, useState } from "react";
import WeatherAppCard from "./Weather";
import { Alert } from "react-bootstrap";

export default function WeatherApplicationCard({ latitude, longitude ,dates}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log(latitude,longitude);
            try {
                // Fetch weather data based on latitude and longitude props
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=c2dcb89ea9d203c414c608032c440e4d`);
                const result = await response.json();
                setData(result);
                console.log(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [latitude, longitude]); // Run effect when latitude or longitude props change

    return (
        <div className="WeatherApp">
            {typeof data.main !== 'undefined' ? (
                <WeatherAppCard weatherData={data} date={dates}/>
            ) : (
                <div>
                    <p>Loading..</p><br />
                    <Alert variant="info" dismissible>
                        <p>Please allow your browser's location instructions to view the weather forecast.</p>
                    </Alert>
                </div>
            )}
        </div>
    );
}
