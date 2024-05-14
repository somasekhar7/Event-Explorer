import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Modal, Row} from 'react-bootstrap';
import {FaChair, FaMapMarkerAlt, FaRegCalendarAlt, FaRegClock, FaWheelchair} from 'react-icons/fa';
import {MdChair} from "react-icons/md";
import '../styles/eventseatmap.css'
import PaymentMethodForm from "./PayementMethodForm";
import {useLocation} from "react-router";
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import WeatherApplicationCardExplorer from "./WeatherApplicationCardExplorerPicks";
import MapContainer from "./MapContainer";

const ExplorerSeatMap = () => {


    const[confirmationCode, setConfirmationCode] = useState('');
    const location = useLocation();
    const { event, eventImage } = location.state || {};
    const seatsPerRow = Math.ceil(event.capacity / 12); // Assuming 12 seats per row

    //const seatsPerRow = 6;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [venueType, setVenueType] = useState([false]);
    const eventLocation = `${event.city}`;
    const eventDay = `${event.eventDate}`;


    const seatPrices = {
        normal:  event.regularPrice,
        handicapped:  event.disabledPrice ,
        vip:  event.vipPrice
    };


    useEffect(() => {
        if(event.venueType.toLowerCase() === 'outdoor'){

            setVenueType('true');
        }
    }, []);

    // const eventDate = new Date(event.dates.start.localDate);
    // const formattedDate = eventDate.toLocaleDateString('en-US', {
    //     weekday: 'long',
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric'
    // });


    sessionStorage.setItem("credit-card-actions", "true");
    const bankNameSession = sessionStorage.getItem("banKNameSession");
    const sessionEmail = sessionStorage.getItem("email");
    const [showWeatherPopup, setShowWeatherPopup] = useState('');

    useEffect(() => {
        // Show the WeatherApplicationCard pop-up when the component mounts
        setShowWeatherPopup(true);
    }, []); // Empty dependency array ensures this effect runs only once on mount


    const handleSeatClick = (row, seatNum) => {
        const seatId = `${row}${seatNum}`;
        setSelectedSeats(prevSelectedSeats =>
            prevSelectedSeats.includes(seatId)
                ? prevSelectedSeats.filter(seat => seat !== seatId)
                : [...prevSelectedSeats, seatId]
        );
    };

    const calculateTotalPrice = () => {
        return selectedSeats.reduce((total, seatId) => {
            const row = seatId.charAt(0);
            if (['F', 'G'].includes(row)) {
                return total + seatPrices.handicapped;
            } else if (['H', 'I', 'J', 'K', 'L', 'M'].includes(row)) {
                return total + seatPrices.normal;
            } else {
                return total + seatPrices.vip;
            }
        }, 0);
    };

    const totalPrice = calculateTotalPrice();

    const renderSeat = (row, seatNum) => {

        const seatId = `${row}${seatNum}`;
        const isSelected = selectedSeats.includes(seatId);
        let seatIcon;

        if (['F', 'G'].includes(row)) {
            seatIcon = <FaWheelchair />;
        } else if (['H', 'I', 'J', 'K', 'L', 'M'].includes(row)) {
            seatIcon = <FaChair />;
        } else {
            seatIcon = <MdChair />;
        }

        return (
            <Button
                key={seatId}
                variant={isSelected ? 'primary' : 'light'}
                className="m-1 theater-seat"
                onClick={() => handleSeatClick(row, seatNum)}
            >
                {seatIcon}
                <span className="price">{`$${seatPrices[row === 'F' || row === 'G' ? 'handicapped' : row === 'H' || row === 'I' || row === 'J' || row === 'K' || row === 'L' || row === 'M' ? 'normal' : 'vip']}`}</span>
            </Button>
        );
    };

    // const phoneNumber = event._embedded?.venues[0]?.boxOfficeInfo?.phoneNumberDetail;
    // const cleanPhoneNumber = phoneNumber ? phoneNumber.replace(/\D/g, '') : '';








    const [formData, setFormData] = useState({
        eventId: '',
        emailId: '',
        seatNumber: '',
        attendees: '',
        totalPrice:'',
        bankName:'',
    });

    const handlePlaceOrder = async () => {
        // Handle placing the order

        console.log(event);
        formData.eventId = event.eventId;
        formData.emailId = sessionEmail;
        formData.seatNumber = selectedSeats;
        formData.attendees = selectedSeats.length;
        formData.totalPrice = totalPrice;
        formData.bankName = bankNameSession && bankNameSession.replace(/"/g, '') ? bankNameSession.replace(/"/g, '') : '';


        try {
            const response = await axios.post("/v1/customer/event/booking", formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setConfirmationCode(response.data);
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            toast.error('Error: ' + error.response.data);
            console.error('Error submitting form:', error);
        }

        console.log(JSON.stringify(formData, null, 2));

    };

    return (
        <Container>


            {/* WeatherApplicationCard pop-up */}
            <Modal show={showWeatherPopup} onHide={() => setShowWeatherPopup(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Weather Forecast</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <WeatherApplicationCardExplorer date={eventDay} city={eventLocation}  />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowWeatherPopup(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col>
                    <div className="text-center">Screen</div>
                </Col>
            </Row>
            <Row className="justify-content-center">
                {/*<StageLabel />*/}
                <Col>
                    {/*<div className="text-center">Screen</div>*/}
                    <div className="stage-label">
                        <h1>STAGE</h1>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col>
                    <div className="text-center">VIP Seats Rows A-E</div>
                </Col>
            </Row>
            {['A', 'B', 'C', 'D', 'E'].map(row => (
                <Row key={row} className="justify-content-center">
                    {Array.from({length: seatsPerRow}, (_, index) => renderSeat(row, index + 1, false, 80, true))}
                </Row>
            ))}
            <Row className="justify-content-center">
                <Col>
                    <div className="text-center">Handicapped Seats</div>
                </Col>
            </Row>
            <Row className="justify-content-center">
                {['F', 'G'].map(row => (
                    <Col key={row}>
                        <Row className="justify-content-center">
                            {Array.from({length: seatsPerRow}, (_, index) => renderSeat(row, index + 1, true, 50, false))}
                        </Row>
                    </Col>
                ))}
            </Row>
            <Row className="justify-content-center">
                <Col>
                    <div className="text-center">Gap</div>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col>
                    <div className="text-center">Rows H-M</div>
                </Col>
            </Row>
            {['H', 'I', 'J', 'K', 'L', 'M'].map(row => (
                <Row key={row} className="justify-content-center">
                    {Array.from({length: seatsPerRow * 3}, (_, index) => renderSeat(row, index + 1, false, '90', false))}
                </Row>
            ))}
            <br/>
            <PaymentMethodForm/>
            <br/>
            <div className="order-summary-box">
                <Row>
                    <Col>
                        <Card className="custom-card" style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={eventImage} alt="Card image cap" />
                            <Card.Body>
                                <h5 className="card-title">{event.eventName}</h5>
                                <Card.Text>
                                    <p><FaRegCalendarAlt/>{`${new Date(event.eventDate).toLocaleDateString('en-US', {
                                        timeZone: 'UTC',
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })} `}</p>
                                    <p><FaRegClock/> {event.eventTime} </p>
                                    <p><FaMapMarkerAlt/> {event.city}, {event.venueName}</p>
                                    <p><MapContainer
                                        location={`${event.city}, ${event.venueName}`}/>
                                    </p>
                                </Card.Text>

                            </Card.Body>
                        </Card>

                    </Col>
                    <Col>
                    <div className="text-right">
                            <br/>
                            <br/>
                            {confirmationCode && <div className="alert alert-success">Booking confirmed! Your event awaits. Your confirmation code: {confirmationCode}. Enjoy every moment!</div>}

                            <h3>Total Price: ${totalPrice}</h3>
                            <div>Selected Seats: {selectedSeats.join(', ')}</div>
                            <br/>
                            <Button variant="success" onClick={handlePlaceOrder}>Place Order</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <ToastContainer />
        </Container>
    );
};

export default ExplorerSeatMap;