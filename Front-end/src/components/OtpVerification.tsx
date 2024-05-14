import React from "react";
import {useState} from "react";
import axios from 'axios';
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import {Button, Tab, Tabs} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/OTPVerification.css'

const OtpVerification:React.FC=()=> {
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    const email = (location.state && location.state.email) ? location.state.email.toString() : '';
    const navigate = useNavigate();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(event.target.value);
    }


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const data = {
            email: email,
            otp: otp
        }
        axios.post("/v1/verify", data)
            .then(response => {
                console.log(response);

                sessionStorage.setItem("userLoggedIn", "true");
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("name", response.data);
                navigate('/loggedIn');
                setTimeout(() => {
                    window.location.reload(); // Refresh the page after 15 seconds
                }, 1000);
                navigate('/home');

            })
            .catch(error => {
                setErrorMessage(error.response.data);
                console.log("Error", error);
            });
    };


    return(
        <>
            <br/><br/><br/><br/><br/><br/>
    <div className="container d-flex justify-content-center align-items-center login-box">
        <div className="row">
            <div className="col">
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <h4>Enter the Verification Code</h4>

                <p>We have sent a 6-digit verification code to the email you provided</p>

                <form>
                    <Tabs id="myTabs">
                        <Tab eventKey="OTP-Verification" title="OTP-Verification">
                            <br/>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control email" id="floatingEmail"
                                       name="email"
                                       placeholder="Enter your email address"
                                       disabled/>
                                <label htmlFor="floatingEmail">{email}</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control password" id="floatingPassword"
                                       name="passcode"
                                       placeholder="Enter your passcode"
                                       value={otp} onChange={handleChange}
                                />
                                <label htmlFor="floatingPassword">Passcode</label>
                            </div>
                            <div className="form-floating">
                                <Button as="input" type="submit" value="verify" id="verify-button"
                                        onClick={handleClick}/>
                            </div>
                        </Tab>
                    </Tabs>
                </form>
            </div>
        </div>
    </div>
        </>
);
}

export default OtpVerification;