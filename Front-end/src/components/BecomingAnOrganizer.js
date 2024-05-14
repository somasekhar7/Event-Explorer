import React, {useEffect, useState} from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../styles/contactInfoForm.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";

function BecomingAnOrganizer() {
    const sessionEmail = sessionStorage.getItem("email");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: sessionEmail,
        phone: '',
        stateId:'',
        message: ''
    });

    const tooltip = (
        <Tooltip id="tooltip">Enter your New York State ID here</Tooltip>
    );

    const[successMessage, setSuccessMessage] = useState('');
    const[errorMessage, setErrorMessage] = useState('');
    const [isorganizer, setIsOrganizer] = useState(false);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation
        if (!formData.name.trim()) {
            setErrorMessage('Name is required');
            return;
        }

        if (!/^[a-zA-Z.\s]+$/.test(formData.name.trim())) {
            setErrorMessage('Please Enter valid name');
            return;
        }

        if (!formData.phone.trim()) {
            setErrorMessage('Phone number is required');
            return;
        }
        if (!/^\d{10}$/.test(formData.phone.trim())) {
            setErrorMessage('Phone number must be 10 digits');
            return;
        }


        if (!formData.stateId.trim()) {
            setErrorMessage('Identification number is required');
            return;
        }
        if(!formData.message.trim()){
            setErrorMessage('Message is required');
            return;
        }


        try {
            // alert("submitted");
            const response = await axios.post("/v1/organizer/create", formData);
            console.log('Form submitted successfully:', response.data);
            setSuccessMessage(response.data);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.response.data);
            console.error('Error submitting form:', error);
        }


        console.log(formData);
    };

    const handleEvent = () =>{


        navigate('/event-creation-form');
    }

    useEffect(() => {


        const checkIfUserIsOrganizer = async () => {
            try {
                const response = await axios.get(`/v1/isOrganizer/${sessionEmail}`);
                setIsOrganizer(response.data);
            } catch (error) {
                console.error('Error fetching organizer :', error);
            }
        }

        checkIfUserIsOrganizer();

    }, [sessionEmail]);

    return (
        <div className="container">
            <br/>
            {isorganizer ?
                (  <>
                        <div className="contact-form">

                            <h1> Event Magic Awaits: Begin Your Organizer Adventure! </h1>
                            <br />
                            <button
                                className="btn btn-primary"
                                onClick={handleEvent}>
                                Create Event
                            </button>

                        </div>

                    </>
                ) : (
                    <>
                        <h1> Become an Organizer </h1>

                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}

                        <div className="contact-form">
                            <div className="row justify-content-center ">
                                <div className="col-md-9">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="floatingEmail"
                                                placeholder="Email"
                                                value={sessionEmail}
                                                name="email"
                                                disabled
                                            />
                                            <label htmlFor="floatingEmail">Email</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="floatingAddress"
                                                placeholder="Name"
                                                value={formData.name}
                                                name="name"
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="floatingAddress">Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="floatingAddress"
                                                placeholder="Phone"
                                                value={formData.phone}
                                                name="phone"
                                                onChange={handleChange}
                                                maxLength={10}
                                                pattern="[0-9]*"
                                                required
                                            />
                                            <label htmlFor="floatingAddress">Phone Number</label>
                                        </div>
                                        <OverlayTrigger
                                            placement="top"
                                            delay={{show: 250, hide: 400}}
                                            overlay={tooltip}
                                        >
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="floatingstateid"
                                                    placeholder="stateid"
                                                    value={formData.stateId}
                                                    name="stateId"
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="floatingAddress">Identification Number</label>
                                            </div>
                                        </OverlayTrigger>
                                        <div className="form-floating mb-3 message">
                                              <textarea
                                                  className="form-control custom-textarea"
                                                  id="message"
                                                  placeholder="message...."
                                                  value={formData.message}
                                                  onChange={handleChange}
                                                  name="message"
                                                  rows={10} // Set the number of visible text lines
                                                  style={{height: '200px !important', width: '100% !important'}}
                                                  required
                                              />
                                            <label htmlFor="floatingState">Message</label>
                                        </div>

                                        <button type="submit" className="btn btn-primary center">Submit</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </>
                )}
        </div>
    );
}

export default BecomingAnOrganizer;