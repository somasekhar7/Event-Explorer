import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col, Container, Toast } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import axios from 'axios';
import '../styles/ResetPassword.css';
import Form from 'react-bootstrap/Form';

const ResetPassword: React.FC = () => {
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const email = (location.state && location.state.email) ? location.state.email.toString() : '';
    const[errorMessage, setErrorMessage] = useState('');

    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const handlePasswordFocus = () => {
        setIsPasswordFocused(true);
    };

    const handlePasswordBlur = () => {
        setIsPasswordFocused(false);
    };

    const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleCloseToast = () => setShowToast(false);

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post(`/v1/reset-password?email=${email}&token=${token}&password=${password}`);
            if (response.status === 200) {
                setShowToast(true);
                setTimeout(() => {
                    navigate('/SignIn');
                }, 3000); // Redirect to login page after 3 seconds
            }
            if(response.status === 400){

                setErrorMessage("Invalid Password");

            }
        } catch (error) {
            setErrorMessage("Invalid Password");
            console.error('Error:', error);
        }
    }

    return (
        <div className="main-container">
            <p style={{ fontSize: 30 }}><strong>Enter your credentials</strong></p>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={7}>
                        <Form.Floating >
                            <Form.Control
                                id="email"
                                type="email"
                                value={email}
                                placeholder={email}
                                className="w-100"
                                disabled
                            />
                            <label htmlFor="email">Email address</label>
                        </Form.Floating>
                        <Form.Floating>
                            <Form.Control
                                className="w-100"
                                id="token"
                                type="text"
                                placeholder="Token"
                                value={token}
                                onChange={handleTokenChange}
                            />
                            <label htmlFor="token">Token</label>
                        </Form.Floating>
                        <Form.Floating>
                            <Form.Control
                                className="w-100"
                                id="floatingPasswordCustom"
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={handlePasswordChange}
                                onFocus={handlePasswordFocus}
                                onBlur={handlePasswordBlur}
                            />
                            <label htmlFor="floatingPasswordCustom">New Password</label>
                            {isPasswordFocused && (
                                <small className="text-muted">Password must be minimum 8 characters long and include at least one letter, one number, and one special character.</small>
                            )}
                        </Form.Floating>
                    </Col>
                </Row>
            </Container>
            <div>
                <Button type="submit" onClick={handleClick} id='btn'>Submit</Button>
            </div>
            <Toast
                show={showToast}
                onClose={handleCloseToast}
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    backgroundColor: '#28a745',
                    color: 'white',
                }}
            >
                <Toast.Header closeButton={false}>
                    <strong className="me-auto">Success</strong>
                </Toast.Header>
                <Toast.Body>Password reset successfully</Toast.Body>
            </Toast>
        </div>
    );
}

export default ResetPassword;
