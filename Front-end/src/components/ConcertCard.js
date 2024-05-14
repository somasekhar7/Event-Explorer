import React, { useState } from 'react';
import '../styles/concertcard.css'
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
// import EventSeatMap from "./EventSeatMap";
const ConcertCard = ({ event }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const isUserLoggedIn =  sessionStorage.getItem("userLoggedIn");
    const navigate = useNavigate();
    const handleClick = (event) => {

        console.log(event);

        if(isUserLoggedIn) {
            navigate('/booking', {state: {event}});
        }
        else{
            navigate('/SignIn');
        }

    };


    return (
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={event.images[0].url} alt="Concert" />
                    <h3>{event.name}</h3>
                    <span className="concert-date"> {event.dates.start.localDate}</span>

                </div>
                <div className="flip-card-back">
                    <h3>{event.classifications[0].segment.name}</h3>
                    <p className="concert-date">{event._embedded.venues[0].city.name}, {event._embedded.venues[0].name}</p>

                    {/*<p>{concert.info}</p>*/}

                    <Button type="submit" className="btn btn-primary"  onClick={() => handleClick(event)} >Buy Tickets </Button>

                </div>
            </div>
        </div>
    );
};

export default ConcertCard;
