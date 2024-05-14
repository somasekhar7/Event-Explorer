import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type Event = {
    title: string;
    description: string;
    image: string;
    ticketLink: string;
    time: string;
};

type EventAccordionProps = {
    events: Event[];
};

const EventAccordion: React.FC<EventAccordionProps> = ({ events }) => {
    return (
        <div className="container-fluid">
            <br/>
            <br/>
            <h1>Billboard Hot 100</h1>
            <div className="row" style={{ marginLeft: '10%', marginRight: '10%', marginTop: '5%', marginBottom: "5%" }}>
                {events.map((event: Event, index: number) => (
                    <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="card">
                            <img src={event.image} className="card-img-top" alt={event.title} />
                            <div className="card-body">
                                <h5 className="card-title"><b>{event.title}</b></h5>
                                <p className="card-text">{event.description}</p>
                                <p className="card-text"><small className="text-body-secondary">{event.time}</small></p>
                                {/*<a href={event.ticketLink} className="btn btn-primary">Buy Tickets</a>*/}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventAccordion;
