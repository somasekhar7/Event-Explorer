import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/profile.css';

const Profile = () => {
    const sessionEmail = sessionStorage.getItem("email");
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    sessionStorage.setItem("sidebaroff", "false");
    const [isEditMode, setIsEditMode] = useState(false);
    const [userData, setUserData] = useState({
        email: sessionEmail,
        address: '',
        city: '',
        state: '',
        phoneNumber: '',
        zipcode: '',
        gender: 'male', // Set a default value for the gender field
    });

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async () => {
        try {
            const response = await axios.get("/v1/details", {
                params: {
                    email: sessionEmail
                }
            });
            const userDataFromDB = response.data;
            if (userDataFromDB) {
                setUserData(prevUserData => ({
                    ...prevUserData,
                    ...userDataFromDB,
                    gender: userDataFromDB.gender || prevUserData.gender  // Set the gender retrieved from the database or default to 'male'
                }));
                setIsEditMode(true);
            }
            if (
                userData.address === null ||
                userData.city === null ||
                userData.state === null ||
                userData.zipcode === null ||
                userData.phoneNumber === null
            ) {
                setIsEditMode(true);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };


    const handleUpdateChange = (e) => {
        setSuccessMessage('');
        setErrorMessage('');
        const { name, value } = e.target;
        // Special handling for the gender field
        if (name === "gender") {
            setUserData(prevData => ({
                ...prevData,
                [name]: value
            }));
        } else {
            setUserData(prevData => ({
                ...prevData,
                [name]: value,
        }));
            }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Validation
        const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
        const zipRegex = /^\d{5}$/;
        const phoneRegex = /^\d{10}$/;

        if (!addressRegex.test(userData.address)) {
            setErrorMessage('Address can only contain letters, numbers, spaces, and these special characters: \', -');
            return;
        }

        if (!addressRegex.test(userData.city)) {
            setErrorMessage('City can only contain letters, numbers, spaces, and these special characters: \', -');
            return;
        }

        if (!addressRegex.test(userData.state)) {
            setErrorMessage('State can only contain letters, numbers, spaces, and these special characters: \', -');
            return;
        }

        if (!phoneRegex.test(userData.phoneNumber)) {
            setErrorMessage('Phone Number must be 10 digits long');
            return;
        }

        if (!zipRegex.test(userData.zipcode)) {
            setErrorMessage('Zip Code must be 5 digits long');
            return;
        }
        try {
            let response;
            if (userData.email) {
                // If user data already exists, update it
                response = await axios.put(`/v1/updateDetails`, userData);
                setSuccessMessage('Profile updated successfully');
            }
            setIsEditMode(false); // Disable edit mode after saving
            console.log('Profile updated/created successfully:', response?.data);
        } catch (error) {
            setErrorMessage('Error updating/creating profile');
            console.error('Error updating/creating profile:', error);
        }
    };

    const handlePostData = async(e)=> {
        e.preventDefault();

        try {
            const response = await axios.post("/v1/update", userData);
            setSuccessMessage('Form submitted successfully');
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            setErrorMessage('Error Submitting form');
            console.error('Error submitting form:', error);
        }

    }




    return (
        <div className="container">
            <br />
            <h1> Update Profile </h1>
            <br />
            <br />
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <div className="update-form">
                <div className="row justify-content-center ">
                    <div className="col-md-9">
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingEmail"
                                    placeholder="Email"
                                    value={userData.email}
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
                                    placeholder="Address"
                                    value={userData.address}
                                    name="address"
                                    onChange={handleUpdateChange}
                                    disabled={!isEditMode}
                                />
                                <label htmlFor="floatingAddress">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingCity"
                                    placeholder="City"
                                    value={userData.city}
                                    name="city"
                                    onChange={handleUpdateChange}
                                    disabled={!isEditMode}
                                />
                                <label htmlFor="floatingCity">City</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingState"
                                    placeholder="State"
                                    value={userData.state}
                                    name="state"
                                    onChange={handleUpdateChange}
                                    disabled={!isEditMode}
                                />
                                <label htmlFor="floatingState">State</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="tel"
                                    inputMode="numeric"
                                    className="form-control"
                                    id="floatingPhoneNumber"
                                    placeholder="Phone Number"
                                    value={userData.phoneNumber}
                                    name="phoneNumber"
                                    required
                                    onChange={handleUpdateChange}
                                    disabled={!isEditMode}
                                />
                                <label htmlFor="floatingPhoneNumber">Phone Number</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="floatingZip"
                                    placeholder="Zip Code"
                                    value={userData.zipcode}
                                    name="zipcode"
                                    onChange={handleUpdateChange}
                                    disabled={!isEditMode}
                                />
                                <label htmlFor="floatingZip">Zip Code</label>
                            </div>
                            <div className="form-floating mb-3 gender">
                                <select
                                    className="form-select"
                                    id="floatingGender"
                                    value={userData.gender}
                                    name="gender"
                                    onChange={handleUpdateChange}
                                    disabled={!isEditMode}
                                >
                                    <option value="male" selected={userData.gender === "male"}>Male</option>
                                    <option value="female" selected={userData.gender === "female"}>Female</option>
                                    <option value="other" selected={userData.gender === "other"}>Other</option>
                                </select>
                                <label htmlFor="floatingGender">Gender</label>
                            </div>
                            {(userData.address != null) ? (
                                <button
                                    type="button" // Set type to button to prevent automatic form submission
                                    className="editbtn"
                                    onClick={() => {
                                    setIsEditMode(true); // Set edit mode to true when the button is clicked
                                    setSuccessMessage(''); // Clear any success messages
                                    setErrorMessage(''); // Clear any error messages
                                }}
                            >
                                Edit
                            </button>):( <button type="submit" className="btn btn-primary center" onClick={handlePostData}>Update</button>)}
                            {userData.address!==null && isEditMode && <button type="submit" className="savebtn" onClick={handleSubmit}>Save</button> }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;


