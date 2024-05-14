import React from "react";
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Tabs} from 'react-bootstrap';
import axios from 'axios';
import "../styles/NavBar.css";
import {Link} from 'react-router-dom';
import userEvent from "@testing-library/user-event";


interface SignInProps {
    onSignIn: () => void;
}

export const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
    const [showModal, setShowModal]=useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({email: '', password: ''});
    const [signUpData, setSignUpData] = useState({
        firstName: '',
        lastName: '',
        signUpEmail: '',
        signupPassword: '',
        dateOfBirth: '',
        confirmSignupPassword:''
    });
    const [activeTab, setActiveTab] = useState('signIn');
    const navigate =useNavigate();
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const handlePasswordFocus = () => {
        setIsPasswordFocused(true);
    };

    const handlePasswordBlur = () => {
        setIsPasswordFocused(false);
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        if (activeTab === 'signIn') {

            const {email, password} = formData;
            axios.post("/v1/login", {email, password})
                .then(response => {
                    console.log("Login Response:", response.data);
                    if(response.status===200){
                        sessionStorage.setItem("userLoggedIn", "true");
                        sessionStorage.setItem("email", email);
                        sessionStorage.setItem("name", response.data);
                        onSignIn();
                        navigate('/loggedIn');
                        navigate('/home');
                    }
                    setShowModal(true);
                })
                .catch(error => {
                    if(error.response.status === 400){
                        setErrorMessage(error.response.data);
                    }else if(error.response.status === 404){
                        setErrorMessage('Account Not Found');
                    }else{
                        setErrorMessage('something went wrong')
                    }

                    console.log("Login Error:", error);
                })
        } else {
            const postData = {
                email: signUpData.signUpEmail,
                password: signUpData.signupPassword,
                firstName: signUpData.firstName,
                lastName: signUpData.lastName,
                dateOfBirth: signUpData.dateOfBirth,

            }


            if(postData.password === signUpData.confirmSignupPassword){

                const {email} = postData;
                axios.post("/v1/signup", postData)

                    .then(response => {
                        console.log('Response:', response.data);
                        sessionStorage.setItem("email", email);
                        setShowModal(true);

                        // Redirect to OTP Verification Page with email as prop
                        navigate('/OtpVerification', { state: { email: signUpData.signUpEmail } })

                    })
                    .catch(error => {

                        if(error.response.status === 400){
                            setErrorMessage(error.response.data);
                        }else{
                            setErrorMessage('something went wrong')
                        }
                        console.log("Error from post:", error);
                    })

            }else{
                setErrorMessage("Password do not match");
            }


        }
    }
    const handleTabChange = (tab: string | null, event: React.SyntheticEvent<unknown> | undefined) => {
        setErrorMessage('');
        if (tab) {
            setActiveTab(tab);
        }
    };

    const handleSignUpChange = (e: { target: { name: any; value: any; }; }) => {
        const {name, value} = e.target;
        setSignUpData((prevSignUpData) => ({
            ...prevSignUpData,
            [name]: value,
        }));
    };


    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <div className="container d-flex justify-content-center login-box">
                <div className="row">
                    <div className="col">

                        <p style={{fontSize: '2.0rem', fontStyle: 'italic'}}><strong>Welcome to EE </strong></p>

                        <form onSubmit={handleSubmit}>
                            <Tabs  id="myTabs" activeKey={activeTab} onSelect={handleTabChange} >

                                <Tab eventKey="signIn" title="Sign In">

                                    <br/>
                                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control email" id="floatingEmail"
                                               name="email"
                                               placeholder="Enter your email address"
                                               value={formData.email}
                                               onChange={handleChange}
                                               required={activeTab === 'signIn'}/>
                                        <label htmlFor="floatingInput">Email address</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="password" className="form-control password" id="floatingPassword"
                                               name="password"
                                               placeholder="Enter your password"
                                               value={formData.password}
                                               onChange={handleChange}
                                               required={activeTab === 'signIn'}/>
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>


                                    <div className="form-check text-start my-3">
                                        <input className="form-check-input" type="checkbox" value="remember-me"
                                               id="flexCheckDefault"/>
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Remember me
                                        </label>
                                        <Link  className="forget-password" to="/ForgotPassword">
                                            Forgot Password?
                                        </Link>

                                    </div>
                                </Tab>
                                <Tab eventKey="signUp" title="Sign Up">
                                    <br/>
                                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control first-name" id="floatingFirstName"
                                               placeholder="First Name"
                                               value={signUpData.firstName}
                                               name="firstName"
                                               onChange={handleSignUpChange}
                                               required={activeTab === 'signUp'}/>
                                        <label htmlFor="floatingFirstName">First Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control last-name" id="floatingLastname"
                                               placeholder="Enter your password"
                                               name="lastName"
                                               value={signUpData.lastName}
                                               onChange={handleSignUpChange}
                                               required={activeTab === 'signUp'}/>
                                        <label htmlFor="floatingPassword">Last Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control email" id="signUpEmail"
                                               name="signUpEmail"
                                               placeholder="Enter your email address"
                                               value={signUpData.signUpEmail}
                                               onChange={handleSignUpChange}
                                               required={activeTab === 'signUp'}/>
                                        <label htmlFor="floatingInput">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="date" className="form-control dateOfBirth" id="dateOfBirth"
                                               name="dateOfBirth"
                                               placeholder="Enter your Birth Date"
                                               value={signUpData.dateOfBirth}
                                               onChange={handleSignUpChange}
                                               required={activeTab === 'signUp'}/>
                                        <label htmlFor="floatingInput">Date of Birth</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control password" id="signupgPassword"
                                               placeholder="Enter your password"
                                               name="signupPassword"
                                               value={signUpData.signupPassword}
                                               onChange={handleSignUpChange}
                                               onFocus={handlePasswordFocus}
                                               onBlur={handlePasswordBlur}
                                               required={activeTab === 'signUp'}/>
                                        <label htmlFor="floatingPassword">Password</label>
                                        {activeTab === 'signUp' && isPasswordFocused && (
                                            <small className="text-muted">Password must be minimum 8 characters long and include at least one letter, one number, and one special character..</small>
                                        )}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control password" id="confirmSignupgPassword"
                                               placeholder="Enter your password"
                                               name="confirmSignupPassword"
                                               value={signUpData.confirmSignupPassword}
                                               onChange={handleSignUpChange}
                                               onFocus={handlePasswordFocus}
                                               onBlur={handlePasswordBlur}
                                               required={activeTab === 'signUp'}/>
                                        <label htmlFor="floatingPassword">Confirm Password</label>
                                        {activeTab === 'signUp' && isPasswordFocused && (
                                            <small className="text-muted">Password must be minimum 8 characters long and include at least one letter, one number, and one special character.</small>
                                        )}
                                    </div>
                                </Tab>
                            </Tabs>


                            <div className="container">
                                {/*<button className="btn btn-outline-primary" type="submit" >Submit</button>*/}
                                <button type="submit" className="btn btn-primary">
                                    {activeTab === 'signIn' ? 'Sign In' : 'Sign Up'}
                                </button>
                                <p className="mt-5 mb-3 text-body-secondary">© 2024–2026</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>

        </div>
    );
}

export default SignIn;