import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/contactInfoForm.css';
import axios from 'axios';

function ContactInfoForm() {
    const [formData, setFormData] = useState({
        name: '',
        emailId: sessionStorage.getItem('email'),
        phoneNumber: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        const errors = {};

        // Name Validation
        if (!formData.name.match(/^[a-zA-Z0-9\s-]+$/)) {
            errors.name = "Name should contain only letters, digits, spaces, and hyphens.";
        }

        // Phone Number Validation
        if (!/^\d{10}$/.test(formData.phoneNumber)) {
            errors.phoneNumber = "Phone number should be 10 digits.";
        }

        // Message Validation
        if (!/^[\w\s\-,.']+$/i.test(formData.message)) {
            errors.message = "Message should contain only letters, digits, hyphens, commas, apostrophes, and dots.";
        }


        if (Object.keys(errors).length > 0) {
            for (const key in errors) {
                toast.error(errors[key]);
            }
            return;
        }

        // If no errors, submit the form
        axios.post('/v1/customer/contact-us', formData)
            .then((response) => {
                if (response.status === 200) {
                    toast.success('Form submitted successfully!');
                    // Optionally, reset the form data after successful submission
                    setFormData({
                        name: '',
                        emailId: sessionStorage.getItem('email'),
                        phoneNumber: '',
                        message: ''
                    });
                }
            })
            .catch((error) => {
                toast.error('Failed to submit form. Please try again later.');
            });
    };

    return (
        <div className="container">
            <br />
            <h1> Contact Us </h1>
            <br />
            <br />
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
                                    value={formData.emailId}
                                    name="emailId"
                                    disabled
                                />
                                <label htmlFor="floatingEmail">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className={`form-control ${formData.name.length > 0 && !formData.name.match(/^[a-zA-Z0-9\s-]+$/) ? 'is-invalid' : ''}`}
                                    id="floatingAddress"
                                    placeholder="Name"
                                    value={formData.name}
                                    name="name"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingAddress">Name</label>
                                {formData.name.length > 0 && !formData.name.match(/^[a-zA-Z0-9\s-]+$/) && (
                                    <div className="invalid-feedback">
                                        Name should contain only letters, digits, spaces, and hyphens.
                                    </div>
                                )}
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className={`form-control ${formData.phoneNumber.length > 0 && !/^\d{10}$/.test(formData.phoneNumber) ? 'is-invalid' : ''}`}
                                    id="floatingAddress"
                                    placeholder="Phone Number"
                                    value={formData.phoneNumber}
                                    name="phoneNumber"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="floatingAddress">Phone Number</label>
                                {formData.phoneNumber.length > 0 && !/^\d{10}$/.test(formData.phoneNumber) && (
                                    <div className="invalid-feedback">
                                        Phone number should be 10 digits.
                                    </div>
                                )}
                            </div>
                            <div className="form-floating mb-3 message">
                                <textarea
                                    className="form-control custom-textarea"
                                    id="message"
                                    placeholder="Message...."
                                    value={formData.message}
                                    onChange={handleChange}
                                    name="message"
                                    rows={10} // Set the number of visible text lines
                                    style={{height: '200px', width: '100%'}}
                                    required
                            />
                                <label htmlFor="floatingState">Message</label>
                            </div>


                            <button type="submit" className="btn btn-primary center">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default ContactInfoForm;
