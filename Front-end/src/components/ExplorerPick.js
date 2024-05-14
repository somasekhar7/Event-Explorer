import React, {useEffect, useState} from 'react';
import { Carousel, Card, Button } from 'react-bootstrap';
import { FaRegCalendarAlt, FaRegClock, FaMapMarkerAlt } from 'react-icons/fa';
import music from '../assests/explorer-musicv2.jpg';
import sports from '../assests/explorer-sports.jpg';
import international from '../assests/international.jpeg'
import ddefault from '../assests/default.jpg'
import axios from "axios";
import EventAccordion from "../pages/EventAccordion";
import {useNavigate} from "react-router-dom";




const ExplorerPick = () => {

    const navigate = useNavigate();
    const isUserLoggedIn =  sessionStorage.getItem("userLoggedIn");

    const[events, setEvents] = useState([]);


    const eventTypeImages = {
        music: {music},
        sports: {sports},
        theater: 'theater.jpg',
        other: 'default.jpg',
    };

    useEffect(() => {
        axios.get('/v1/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);



    const getImageUrl = (eventType) => {

        console.log(eventType)
        switch (eventType) {
            case 'music':
                return music;
            case 'sports':
                return sports;
            case 'theater':
                return 'theater.jpg';
            case 'international':
                return international;
            default:
                return ddefault;
        }
    };

    const calculateTimeDifference = (createTimeStamp) => {
        const currentTime = new Date();
        const eventTime = new Date(createTimeStamp);
        console.log("cereate time stamp " + createTimeStamp)
        const diffInMs = currentTime - eventTime;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert milliseconds to minutes

        if (diffInMinutes < 60) {
            return diffInMinutes === 0 ? 'just now' : `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
        } else {
            const diffInHours = Math.floor(diffInMinutes / 60);
            return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
        }
    };

    const handleClick = (event) => {
        console.log(event)

        let eventImage;
        switch (event.eventType) {
            case 'music':
                eventImage = music;
                break;
            case 'sports':
                eventImage = sports;
                break;
            case 'theater':
                eventImage = ddefault;
                break;
            case 'international':
                eventImage = international;
                break;
            default:
                eventImage = ddefault;
        }

        if(isUserLoggedIn) {
            navigate('/explorer-booking', {state: {event, eventImage}});
        }
        else{
            navigate('/SignIn');
        }
    }


    return (
        <>
            <div className="container">

                <p>Get Ready for some excitement! Explore our upcoming events!</p>
            </div>

            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {events.map((event, index) => (
                        <div key={index} className="col">
                            <div className="card" style={{width: '18rem'}}>
                                <img src={getImageUrl(event.eventType)} className="card-img-top" alt={event.eventName}/>
                                <div className="card-body">
                                    <h5 className="card-title"><b>{event.eventName}</b></h5>
                                    <p className="card-text">{event.description}</p>
                                    <p className="card-text">
                                       <small className="text-body-secondary">
                                          {`${new Date(event.eventDate).toLocaleDateString('en-US', {
                                               weekday: 'long',
                                                year: 'numeric',
                                               month: 'long',
                                                day: 'numeric'
                                            })} ${event.eventTime}`}
                                        </small>
                                    </p>
                                    

                                    {/*<a href="/explorer-booking" className="btn btn-primary">Buy Tickets</a>*/}

                                    <Button type="submit" className="btn btn-primary"
                                            onClick={() => handleClick(event)}>Buy Tickets </Button>

                                    <br/>
                                    <br/>
                                    <p className="card-text" style={{fontSize: '12px', fontStyle: 'italic'}}>
                                        last updated {calculateTimeDifference(event.createTimeStamp)}
                                    </p>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );

};

export default ExplorerPick;