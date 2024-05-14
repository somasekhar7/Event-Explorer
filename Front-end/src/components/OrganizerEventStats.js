import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js'; // Importing Chart.js with 'auto' to include all components
import { Container, Row, Col, Card, ListGroup, Table } from 'react-bootstrap';
import axios from 'axios';

const OrganizerEventStats = () => {
    const sessionEmail = sessionStorage.getItem("email");

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const[isDataAvailable, setIsDataAvailable] = useState(false);
    const [eventInformationData, setEventInformationData] = useState({
        labels: ['Tickets Sold', 'Tickets Remaining', 'Seating Capacity', 'Revenue Generated ($)'],
        datasets: [{
            label: 'Event Information',
            data: [],
            backgroundColor: ['#007bff', '#ffc107', 'green', '#dc3545'],
            hoverOffset: 8,
        }]
    });
    const chartRef = useRef(null);

    const fetchEventData = async () => {
        try {
            const response = await axios.get(`/v1/event-statistics/${sessionEmail}`);
            setEvents(response.data);
            setIsDataAvailable(true)
        } catch (error) {
            console.error('Error fetching event data:', error);
        }
    };

    useEffect(() => {
        fetchEventData();
    }, []);

    const updateChartData = (event) => {
        const eventData = [
            parseInt(event.soldCapacity),
            parseInt(event.remainingCapacity),
            parseInt(event.eventCapacity),
            parseFloat(event.totalRevenue)
        ];

        setEventInformationData(prevData => {
            return {
                ...prevData,
                datasets: [{
                    ...prevData.datasets[0],
                    data: eventData
                }]
            };
        });
    };

    const createChart = () => {
        if (chartRef.current && eventInformationData.datasets[0].data.length > 0) {
            new Chart(chartRef.current, {
                type: 'doughnut',
                data: {
                    labels: eventInformationData.labels,
                    datasets: eventInformationData.datasets,
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const label = eventInformationData.labels[context.dataIndex];
                                    const value = eventInformationData.datasets[0].data[context.dataIndex];
                                    return `${label}: ${value}`;
                                }
                            }
                        },
                        legend: {
                            position: 'bottom',
                        }
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: true,
                        duration: 1000
                    }
                }
            });
        }
    };

    useEffect(() => {
        createChart();
    }, [eventInformationData]);

    useEffect(() => {
        if (events.length > 0 && !selectedEvent) {
            setSelectedEvent(events[0]);
            updateChartData(events[0]);
        }
    }, [events, selectedEvent]);

    const handleCheckboxChange = (event, selectedEvent) => {
        if (events.length > 1 || selectedEvent !== null) {
            setSelectedEvent(selectedEvent);
            updateChartData(selectedEvent);
        }
    };

    return (
        <>
            <br/>
            <h2>Organizer Events</h2>
            {!isDataAvailable ? (
                <Container>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '50vh', // Ensures the content takes up at least the full height of the viewport
                    }}>
                        <h2 style={{
                            transition: 'color 0.1s ease-in-out, transform 0.1s ease-in-out', // Adding transition for color and transform
                            marginBottom:'20px'
                        }}>It looks like you haven't created any events yet!</h2>
                        <h3 style={{
                            marginBottom: '60px',
                            transition: 'color 0.1s ease-in-out, transform 0.1s ease-in-out', // Adding transition for color and transform
                        }}>Get started by creating your first event now!</h3>
                        <button style={{
                            backgroundColor: '#007bff',
                            color: '#fff',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            textDecoration: 'none', // Remove underline from anchor
                            transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out', // Adding transition for background color and transform
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
                            margin: '10px 0', // Add margin for spacing
                            textAlign: 'center', // Center align text
                            textTransform: 'uppercase', // Uppercase text
                        }}>
                            <a href="/event-creation-form" style={{color: '#fff', textDecoration: 'none'}}>Create
                                Event</a>
                        </button>
                    </div>


                </Container>
            ) : (
                <Container>
                    <Row className="g-3 mb-3">
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <h2 className="text-body-emphasis text-nowrap">Event Information</h2>
                                    <h5 className="text-body-tertiary mb-4">Details about the event</h5>
                                    <ListGroup variant="flush">
                                        {eventInformationData.labels.map((label, index) => (
                                            <ListGroup.Item key={index}>
                                                <span className="d-inline-block bg-info-light bullet-item me-2"></span>
                                                <strong>{label}</strong>: {eventInformationData.datasets[0].data[index]}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    {/*<Button variant="outline-primary" className="mt-3">See Details</Button>*/}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <div className="position-relative mb-sm-4 mb-xl-0">
                            <canvas ref={chartRef} style={{ minHeight: '390px', width: '100%', border: '1px solid #ccc' }}></canvas>
                        </div>
                    </Col>
                </Row>
                <br />
                <div className="table-responsive">
                    <Table striped bordered hover className="table-rounded table-shadow">
                        <thead>
                        <tr>
                            <th className="text-center bg-primary text-white">Select</th>
                            <th className="text-center bg-primary text-white">Event Title</th>
                            <th className="text-center bg-primary text-white">Date</th>
                            <th className="text-center bg-primary text-white">Tickets Sold</th>
                            <th className="text-center bg-primary text-white">Seats Remaining</th>
                            <th className="text-center bg-primary text-white">Seating Capacity</th>
                            <th className="text-center bg-primary text-white">Revenue Generated</th>
                        </tr>
                        </thead>
                        <tbody>
                        {events.map((event, index) => (
                            <tr key={index}>
                                <td className="text-center">
                                    {events.length > 1 &&
                                    <input
                                        type="checkbox"
                                        checked={selectedEvent === event}
                                        onChange={() => handleCheckboxChange(event, selectedEvent === event ? null : event)}
                                    />
                                    }
                                </td>
                                <td className="text-center">{event.eventName}</td>
                                <td className="text-center">{event.eventDate}</td>
                                <td className="text-center">{event.soldCapacity}</td>
                                <td className="text-center">{event.remainingCapacity}</td>
                                <td className="text-center">{event.eventCapacity}</td>
                                <td className="text-center">${event.totalRevenue}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </Container>)}
        </>
    );
};

export default OrganizerEventStats;
