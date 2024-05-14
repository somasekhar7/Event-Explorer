import React, {useState,useEffect} from 'react';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import {FaChair, FaMapMarkerAlt, FaRegCalendarAlt, FaRegClock, FaWheelchair} from 'react-icons/fa';
import {MdChair} from "react-icons/md";
import '../styles/eventseatmap.css'
import PaymentMethodForm from "./PayementMethodForm";
import {useLocation} from "react-router";
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MapContainer from "./MapContainer";
import WeatherApplicationCard from "./WeatherApplicationCard";
import {Modal} from "react-bootstrap";

const EventSeatMap = () => {


    const[confirmationCode, setConfirmationCode] = useState('');

    const location = useLocation();
    const { event } = location.state || {};
    console.log("this is from event details from search ",event)
    const seatsPerRow = 6;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showWeatherPopup, setShowWeatherPopup] = useState(false);

    const latitude = `${event._embedded.venues[0].location.latitude}`;
    const longitude = `${event._embedded.venues[0].location.longitude}`;
    const Dates =  `${event.dates.start.localDate}`;


    useEffect(() => {
        // Show the WeatherApplicationCard pop-up when the component mounts
        setShowWeatherPopup(true);
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const seatPrices = {
        normal: event.priceRanges && event.priceRanges[0] && event.priceRanges[0].min ? event.priceRanges[0].min : '60',
        handicapped: event.priceRanges && event.priceRanges[0] && event.priceRanges[0].max ? event.priceRanges[0].max - 10 : '50',
        vip: event.priceRanges && event.priceRanges[0] && event.priceRanges[0].max ? event.priceRanges[0].max : '100'
    };


    const eventDate = new Date(event.dates.start.localDate);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });


    sessionStorage.setItem("credit-card-actions", "true");
    const bankNameSession = sessionStorage.getItem("banKNameSession");
    const sessionEmail = sessionStorage.getItem("email");

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
                return total + +seatPrices.handicapped; // convert to number
            } else if (['H', 'I', 'J', 'K', 'L', 'M'].includes(row)) {
                return total + +seatPrices.normal; // convert to number
            } else {
                return total + +seatPrices.vip; // convert to number
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

    const phoneNumber = event._embedded?.venues[0]?.boxOfficeInfo?.phoneNumberDetail;
    const cleanPhoneNumber = phoneNumber ? phoneNumber.replace(/\D/g, '') : '';



    const eventRequest = {

        eventId: event.id,
        userEmail: "mticket320@gmail.com",
        eventName: event.name,
        eventType: event.type || 'Music',
        eventDate: event.dates.start.localDate || '',
        eventTime: event.dates.start.localTime || '',
        venueName: event._embedded?.venues[0]?.name || '',
        capacity: 100 ,
        // price: event.priceRanges && event.priceRanges[0] && event.priceRanges[0].max ? event.priceRanges[0].max : '50',
        regularPrice: seatPrices.normal,
        vipPrice : seatPrices.vip,
        disabledPrice: seatPrices.normal,
        city: event._embedded?.venues[0]?.city?.name || '',
        state: event._embedded?.venues[0]?.state?.name || 'NY',
        contactNumber: 9876140152 || '',
        venueType: event?.classifications?.[0]?.segment?.name || '',
        description: event?.info || 'this is the ticket master event ',
        eventEmailAddress: 'eventexplorer099@gmail.com'
    }





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

        formData.eventId = event.id;
        formData.emailId = sessionEmail;
        formData.seatNumber = selectedSeats;
        formData.attendees = selectedSeats.length;
        formData.totalPrice = totalPrice;
        formData.bankName = bankNameSession && bankNameSession.replace(/"/g, '') ? bankNameSession.replace(/"/g, '') : '';


        console.log(eventRequest)
        try {
            const response = await axios.post("/v1/organiser/events/create", eventRequest, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('event created successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }


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
                    <WeatherApplicationCard latitude={latitude} longitude={longitude} dates={Dates}/>
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
                            <Card.Img variant="top" src={event.images[0].url} alt="Card image cap" />
                            <Card.Body>
                                <h5 className="card-title">{event.name}</h5>
                                <Card.Text>
                                    <p><FaRegCalendarAlt/>{formattedDate}</p>
                                    <p><FaRegClock/> {event.dates.start.localTime}</p>
                                    <p><FaMapMarkerAlt/> {event._embedded.venues[0].city.name}, {event._embedded.venues[0].name}</p>

                                    <p><MapContainer location={`${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].name}`} /></p>

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

export default EventSeatMap;

