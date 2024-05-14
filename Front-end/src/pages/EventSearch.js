import React, { useState } from 'react';
import {Form, Button, Card, Carousel} from 'react-bootstrap';
import axios from 'axios';

const EventSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [events, setEvents] = useState([]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value) {
            axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${e.target.value}&apikey=JGuimADvJB6gzXP7jnjTGaFsm91fdQjV`)
                .then(response => {
                    setEvents(response.data._embedded.events);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            setEvents([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchTerm}&apikey=JGuimADvJB6gzXP7jnjTGaFsm91fdQjV`)
            .then(response => {
                setEvents(response.data._embedded.events);
                console.log(response.data._embedded.events);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <div>
                <Form>
                    <Form.Control type="text" placeholder="Search for events..." value={searchTerm} onChange={handleChange} />
                </Form>
                <Carousel>
                    {events.map((event) => (
                        <Carousel.Item key={event.id}>
                            <img
                                className="d-block w-100"
                                src={event.images[0].url}
                                alt={event.name}
                            />
                            <Carousel.Caption>
                                <h3>{event.name}</h3>
                                <p>{event.dates.start.localDate}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default EventSearch;
