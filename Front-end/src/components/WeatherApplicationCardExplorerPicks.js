import React, { useEffect, useState } from "react";
import WeatherAppCard from "./Weather";
import {Alert} from "react-bootstrap";
import WeatherAppCardExplorer from "./WeatherExplorerPicks";
export default function WeatherApplicationCardExplorer({date, location}) {

    // const [lat, setLat] = useState([]);
    // const [long, setLong] = useState([]);
    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                // setLat(latitude);
                // setLong(longitude);

                console.log("Latitude is:", latitude);
                console.log("Longitude is:", longitude);

                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=c2dcb89ea9d203c414c608032c440e4d`);
                const result = await response.json();
                setData(result);
                console.log(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount


    return (
        <div className="WeatherApp">
            {(typeof data.main != 'undefined') ? (
                <WeatherAppCardExplorer weatherData={data} date={date} location={location}/>
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


