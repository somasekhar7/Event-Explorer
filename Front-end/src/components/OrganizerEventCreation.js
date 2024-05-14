import React, { useEffect, useState } from 'react';
import '../styles/organizerEventCreation.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrganizerEventCreation() {
    const [formData, setFormData] = useState({
        userEmail: '',
        eventName: '',
        eventType: '',
        eventDate: '',
        eventTime: '',
        venueName: '',
        venueType: '',
        capacity: '',
        regularPrice: '',
        vipPrice: '',
        disabledPrice: '',
        city: '',
        state: '',
        contactNumber: '',
        description: '',
        eventEmailAddress: ''
        // eventImage: null
    });

    const [errorMessage, setErrorMessage] = useState('');
    const sessionEmail = sessionStorage.getItem("email");

    useEffect(() => {
        if (sessionEmail) {
            setFormData(prevFormData => ({
                ...prevFormData,
                userEmail: sessionEmail
            }));
        }
    }, [sessionEmail]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "eventImage") {
            setFormData(prevFormData => ({
                ...prevFormData,
                eventImage: e.target.files[0]
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        const errors = {};

        // Event Name Validation
        if (!formData.eventName.match(/^[a-zA-Z\s]+$/)) {
            errors.eventName = "Event name should contain only letters and spaces.";
        }

        // Event Type Validation
        if (!formData.eventType.match(/^[a-zA-Z\s]+$/)) {
            errors.eventType = "Event type should contain only letters and spaces.";
        }

        // Event Date Validation
        const currentDate = new Date();
        const selectedDate = new Date(formData.eventDate);
        if (selectedDate <= currentDate) {
            errors.eventDate = "Event date should be after the current date.";
        }

        // Venue Name Validation
        if (!formData.venueName.match(/^[a-zA-Z0-9\s-]+$/)) {
            errors.venueName = "Venue name should contain only letters, digits, spaces, and hyphens.";
        }

        // Venue Type Validation
        if (!formData.venueType.match(/^[a-zA-Z0-9\s-]+$/)) {
            errors.venueType = "Venue type should contain only letters, digits, spaces, and hyphens.";
        }

        // Capacity Validation
        if (!/^\d+$/.test(formData.capacity)) {
            errors.capacity = "Capacity should contain only digits.";
        }

        // Price Validation
        if (!/^\d+(\.\d{1,2})?$/.test(formData.regularPrice)) {
            errors.price = "Price should be a valid number.";
        }

        // VIP Seat Price Validation
        if (!/^\d+(\.\d{1,2})?$/.test(formData.vipPrice)) {
            errors.vipPrice = "VIP seat price should be a valid number.";
        }

        // Handicapped Seat Price Validation
        if (!/^\d+(\.\d{1,2})?$/.test(formData.disabledPrice)) {
            errors.disabledPrice = "Handicapped seat price should be a valid number.";
        }

        // City Validation
        if (!formData.city.match(/^[a-zA-Z\s]+$/)) {
            errors.city = "City should contain only letters and spaces.";
        }

        // State Validation
        if (!formData.state.match(/^[a-zA-Z\s]+$/)) {
            errors.state = "State should contain only letters and spaces.";
        }

        // Phone Number Validation
        if (!/^\d{10}$/.test(formData.contactNumber)) {
            errors.contactNumber = "Phone number should be 10 digits.";
        }

        // Description Validation
        if (!/^[\w\s-.,]+$/.test(formData.description)) {
            errors.description = "Description should contain only letters, digits, spaces, and hyphens.";
        }

        // if (Object.keys(errors).length > 0) {
        //     setErrorMessage(errors);
        //     return;
        // }
        if (Object.keys(errors).length > 0) {
            // Display individual field validation errors
            for (let key in errors) {
                toast.error(errors[key]);
            }
            return;
        }

        // If no errors, submit the form
        const formDataToSend = new FormData();
        for (let key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        axios.post("/v1/organiser/events/create", formData)
            .then(response => {
                if (response.status === 200) {
                    toast.success("Form submitted successfully!");
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    toast.error("Unauthorized");
                }
                toast.error("Error submitting form. Please try again later.");
                console.log("Error:", error.response ? error.response.data : error.message);
            });
    };

    return (
        <div className="container">
            <h1> Event Creation Form </h1>
            <br/>
            {/*{Object.keys(errorMessage).length > 0 && (*/}
            {/*    <div className="alert alert-danger">*/}
            {/*        {Object.values(errorMessage).map((error, index) => (*/}
            {/*            <div key={index}>{error}</div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}
            <div className="event-form">
                <div className="row justify-content-center ">
                    <div className="col-md-9">
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingEmail"
                                    placeholder="User Email"
                                    value={sessionEmail}
                                    name="userEmail"
                                    disabled
                                />
                                <label htmlFor="floatingEmail">Email</label>
                            </div>

                            {/* Event Name */}
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingEventName"
                                    placeholder="Event Name"
                                    value={formData.eventName}
                                    name="eventName"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingEventName">Event Name</label>
                            </div>

                            {/* Event Type */}
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingEventType"
                                    placeholder="Event Type"
                                    value={formData.eventType}
                                    name="eventType"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingEventType">Event Type</label>
                            </div>

                            {/* Event Date */}
                            <div className="form-floating mb-3">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="floatingDate"
                                    placeholder="Event Date"
                                    value={formData.eventDate}
                                    name="eventDate"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingDate">Event Date</label>
                            </div>

                            {/* Event Time */}
                            <div className="form-floating mb-3">
                                <input
                                    type="time"
                                    className="form-control"
                                    id="floatingTime"
                                    placeholder="Event Time"
                                    value={formData.eventTime}
                                    name="eventTime"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingTime">Event Time</label>
                            </div>

                            {/* Venue Name */}
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingVenueName"
                                    placeholder="Venue Name"
                                    value={formData.venueName}
                                    name="venueName"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingVenueName">Venue Name</label>
                            </div>

                            {/* Venue Type */}
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingVenueType"
                                    placeholder="Venue Type"
                                    value={formData.venueType}
                                    name="venueType"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingVenuType">Venue Type</label>
                            </div>

                            {/* Capacity */}
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingCapacity"
                                    placeholder="Capacity"
                                    value={formData.capacity}
                                    name="capacity"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingCapacity">Capacity</label>
                            </div>

                            {/* Price */}
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingPrice"
                                    placeholder="Price"
                                    value={formData.regularPrice}
                                    name="regularPrice"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingPrice">Regular Price</label>
                            </div>

                            {/* VIP Seat Price */}
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingVIPPrice"
                                    placeholder="VIP Seat Price"
                                    value={formData.vipPrice}
                                    name="vipPrice"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingVIPPrice">VIP Seat Price</label>
                            </div>

                            {/* Handicapped Seat Price */}
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingHandicappedPrice"
                                    placeholder="Handicapped Seat Price"
                                    value={formData.disabledPrice}
                                    name="disabledPrice"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingHandicappedPrice">Handicapped Seat Price</label>
                            </div>

                            {/* City */}
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingCity"
                                    placeholder="City"
                                    value={formData.city}
                                    name="city"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingCity">City</label>
                            </div>

                            {/* State */}
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingState"
                                    placeholder="State"
                                    value={formData.state}
                                    name="state"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingState">State</label>
                            </div>

                            {/* Contact Number */}
                            <div className="form-floating mb-3">
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="floatingPhoneNumber"
                                    placeholder="Contact Number"
                                    value={formData.contactNumber}
                                    name="contactNumber"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingContactNumber">Phone Number</label>
                            </div>

                            {/* Description */}
                            <div className="form-floating mb-3">
                                <textarea
                                    className="form-control custom-textarea"
                                    id="description"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    name="description"
                                    rows={10} // Set the number of visible text lines
                                    style={{ height: '200px', width: '100%' }}
                                    required
                                />
                                <label htmlFor="description">Description</label>
                            </div>

                            {/* Event Email Address */}
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingEventEmailAddress"
                                    placeholder="Event Email Address"
                                    value={formData.eventEmailAddress}
                                    onChange={handleChange}
                                    name="eventEmailAddress"
                                    required
                                />
                                <label htmlFor="floatingEventEmailAddress">Event Email Address</label>
                            </div>


                            <button type="submit" className="btn btn-primary center">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default OrganizerEventCreation;
