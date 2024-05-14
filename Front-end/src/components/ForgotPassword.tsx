import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import '../styles/ForgotPassword.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!email.trim()) {
            setErrorMessage("Email is required");
            return;
        }

        axios.get(`/v1/forget-password?email=${email}`)

            .then(response => {
                console.log(response.data);
                if (response.status === 200) {
                    navigate('/ResetPassword', { state: { email: email } });
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    setErrorMessage("Unauthorized");
                }
                console.log("Error:", error);
            });
    }

    return (
        <>
            <div className="box">
                <h2>Forget Password</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <p className="text-info">Enter the Email to receive the reset link</p>
                <br />
                <form>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control email" id="floatingEmail"
                               name="email"
                               placeholder="Enter your email address"
                               onChange={handleChange}
                               value={email}
                               required
                        />
                        <label htmlFor="floatingEmail">Email address</label>
                    </div>
                    <div className="form-floating">
                        <Button type="submit" onClick={handleClick}>Reset</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ForgotPassword;
