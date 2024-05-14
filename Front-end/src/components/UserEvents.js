import React, {useEffect, useState} from 'react';
import '../styles/userevent.css'
import { Tab, Tabs, } from 'react-bootstrap';
import { Accordion, AccordionItem, Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import axios from "axios";


const UserEvents = () => {
    const [activeTab, setActiveTab] = useState('past'); // State to manage active tab
    const sessionEmail = sessionStorage.getItem("email");

    const[pastData, setPastData] = useState(null);
    const[upComingData, setUpComingData] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/v1/customer/events/upcoming/${sessionEmail}`);
                setUpComingData(response.data);
            } catch (error) {
                console.error('Error fetching upcoming events:', error);
            }
        };

        fetchData(); // Call the inner async function
    }, []); // Empty dependency array means this effect will run only once
    const handleTabSelect = async (tab) => {


        setActiveTab(tab);

        if(tab === "past"){

            try{

                const response = await axios.get(`/v1/customer/events/past/${sessionEmail}`);
                console.log("you selected past tab")
                console.log(response.data);
                setPastData(response.data);

            }catch (error){


            }


        }
        if(tab === "upcoming"){

            try{

                const response = await axios.get(`/v1/customer/events/upcoming/${sessionEmail}`);

                setUpComingData(response.data);

            }catch (error){


            }


            console.log("you selected upcoming tab")
        }


    };
    const navigate =useNavigate();

    const sendHome = () =>{

        sessionStorage.setItem("sidebaroff", "false");
        navigate('/home');

    }


    return (
        <div className="container d-flex justify-content-center event-box">
            <div className="row">
                <div className="col">

                    <p style={{fontSize: '2.0rem', fontStyle: 'italic'}}><strong>Events</strong></p>
                    <Tabs  id="event-tabs"  defaultActiveKey="upcoming"  onSelect={handleTabSelect} >
                        <Tab eventKey="past" title="Past Events">
                            <br/>


                            <Accordion>
                                {pastData !== null && pastData.map((data, index) => (
                                    <AccordionItem key={index} eventKey={index.toString()}>
                                        <Accordion.Header><b>{data.eventDate}</b>  - Order #{data.orderNumber}</Accordion.Header>
                                        <Accordion.Body>
                                            <h4>{data.eventName}</h4><br />
                                            {data.state}, {data.venueName}
                                        </Accordion.Body>
                                    </AccordionItem>
                                ))}
                            </Accordion>

                        </Tab>
                        <Tab eventKey="upcoming"  title="Upcoming Events">
                            <br/>
                            {upComingData !== null && upComingData.length > 0 ? (
                                upComingData.map((data, index) => (
                                    <Accordion key={index}>
                                        <AccordionItem eventKey={index.toString()}>
                                            <Accordion.Header><b>{data.eventDate}</b> - Order #{data.orderNumber}</Accordion.Header>
                                            <Accordion.Body>
                                                <h4>{data.eventName}</h4><br />
                                                {data.state}, {data.venueName}
                                            </Accordion.Body>
                                        </AccordionItem>
                                    </Accordion>
                                ))
                            ) : (
                                <div>
                                    <h3>No upcoming events</h3><br/>
                                    Your purchased tickets will magically appear here! Explore our events to discover tickets for something truly amazing.
                                    <br />
                                    <br/>
                                    <Button type="submit" className="btn btn-primary" onClick={sendHome}>Browse Events </Button>
                                </div>
                            )}

                        </Tab>
                    </Tabs>
                </div>
            </div>


        </div>
    );
};

export default UserEvents;
