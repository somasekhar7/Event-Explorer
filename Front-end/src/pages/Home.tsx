import React from 'react';
import { Carousel } from 'react-bootstrap';
import jimmyk from '../assests/jimmykimmel.png';
import albanyskate from '../assests/albanyiceskating.png';


const events = [
    { id: 1, name: 'Comedy Event', description: 'Live Comedy', imageUrl: jimmyk},
    { id: 2, name: 'Sports Event', description: 'Sports Matches, Tournaments, Championships', imageUrl: albanyskate },
    { id: 3, name: 'Arts Event', description: 'Art Exhibitions, Theater Performances, Cultural Festivals', imageUrl: 'arts_event.jpg' },
    // Add more events as needed
];

export function Home() {
    sessionStorage.setItem("sidebaroff", 'false');
    return (
        <>
        <Carousel>
            {events.map((event) => (
                <Carousel.Item key={event.id}>
                    <img
                        className="d-block w-100"
                        src={event.imageUrl}
                        alt={event.name}

                    />
                    <Carousel.Caption>
                        <h3>{event.name}</h3>
                        <p>{event.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
        </>
    );
};


