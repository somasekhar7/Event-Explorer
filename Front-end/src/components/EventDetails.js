import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {Button} from "react-bootstrap";

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();
    const isUserLoggedIn =  sessionStorage.getItem("userLoggedIn");

    useEffect(() => {
        axios.get(`https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=JGuimADvJB6gzXP7jnjTGaFsm91fdQjV`)
            .then(response => {
                console.log(response.data);
                setEvent(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [eventId]);

    if (!event) {
        return <div>Loading...</div>;
    }

    const handleBuyTickets = (event) => {
        if(isUserLoggedIn) {
            navigate('/booking', {state: {event}});
        }
        else{
            navigate('/SignIn');
        }

    }

    return (
        <div>
            <h1>{event.name}</h1>
            <img src={event.images[0].url} alt={event.name} />
            <p>Date: {event.dates.start.localDate}</p>
            <p>Location: {event._embedded.venues[0].name}, {event._embedded.venues[0].city.name}</p>
            <p>Genre: {event.classifications[0].genre.name}</p>
            <p>{event.info}</p>
            {/*<p>Buy Tickets: <a href={eventDetails.url} target="_blank" rel="noreferrer">Ticketmaster</a></p>*/}
            <Button type="submit" className="btn btn-primary" onClick={() => handleBuyTickets(event)}  >Buy Tickets </Button>
        </div>
    );
};

export default EventDetails;
