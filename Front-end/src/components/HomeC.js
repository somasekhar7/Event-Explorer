import React, { useEffect, useState } from 'react';
import { Card, Button} from 'react-bootstrap';
import axios from 'axios';
import '../styles/homec.css'
import ConcertCard from "./ConcertCard";
import PollItem from "./PollItem";
import {useNavigate} from "react-router-dom";
import Footer from "../pages/Footer";
import MapContainer from "./MapContainer";


const HomeC = () => {
    const [concerts, setConcerts] = useState([]);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const isUserLoggedIn =  sessionStorage.getItem("userLoggedIn");
    const [hasVoted, setHasVoted] = useState(false);
    const email = sessionStorage.getItem("email");



    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("started fetching api")
                const response = await axios.get(
                    'https://app.ticketmaster.com/discovery/v2/events?apikey=JGuimADvJB6gzXP7jnjTGaFsm91fdQjV&keyword=Upstate%20New%20York%20music&locale=*&size=50'
                );
                // Filter out duplicate events based on name or ID
                const events = response.data._embedded.events;
                const uniqueEvents = events.reduce((acc, event) => {
                    if (!acc.some(e => e.name === event.name || e.id === event.id)) {
                        acc.push(event);
                    }
                    return acc;
                }, []);
                // Sort events by event date
                const sortedEvents = uniqueEvents.sort((a, b) => new Date(a.dates.start.dateTime) - new Date(b.dates.start.dateTime));
                setEvents(sortedEvents);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };
        fetchData();
    }, []);



    useEffect(() => {
        const checkUserVote = async () => {
            try {
                const response = await axios.get(`/v1/check-vote/${email}`);
                setHasVoted(response.data);
            } catch (error) {
                console.error('Error checking user vote:', error);
            }
        };
        if (isUserLoggedIn) {
            checkUserVote();
        }
    }, [isUserLoggedIn]);

    const handleClick = (concert) => {

        console.log(concert);


    };

    return (
        <>

            {isUserLoggedIn && !hasVoted && <PollItem />}
            <div className="container">
                <div className="row">
                    {concerts.map((concert, index) => (
                        <div className="col-md-4" key={index}>
                            <Card style={{width: '18rem'}}>
                                <Card.Img variant="top" src={concert.images[0].url}/>
                                <Card.Body>
                                    <Card.Title>{concert.name}</Card.Title>
                                    <Card.Text>{concert.classifications[0].genre.name}</Card.Text>
                                    <Button type="submit" className="btn btn-primary"  onClick={() => handleClick(concert)} >Buy Tickets </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {concerts.map((concert, index) => (
                        <div className="col-md-4" key={index}>
                            <ConcertCard concert={concert}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container">
                <h1>Upcoming Concerts in Upstate New York</h1>
                <div className="row">
                    {events.map((event, index) => (

                        <div className="col-md-4" key={index}>
                            <ConcertCard event={event}/>
                        </div>
                    ))}
                </div>
            </div>

            <Footer/>
        </>

    );
};

export default HomeC;
