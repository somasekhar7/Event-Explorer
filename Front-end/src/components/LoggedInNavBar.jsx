import '../styles/LoggedInNavBar.css';
import logo from "../assests/logo.png";
import React, { useEffect, useState, useRef } from "react";
import user from '../icons/user.png';
import help from '../icons/help.png';
import settings from '../icons/settings.png';
import logout from '../icons/logout.png';
import profile from '../icons/profile.png';
import { FaUser } from "react-icons/fa";
import SearchComponent from "./SearchComponent";
import axios from "axios";


function LoggedInNavBar() {
    const sessionEmail = sessionStorage.getItem("email");
    const [isOrganizer, setIsOrganizer] = useState(false); // Default to user mode
    const [isUserMode, setIsUserMode] = useState(true); // Default to user mode
    const name = sessionStorage.getItem("name");
    const subMenuRef = useRef(null);


    useEffect(() => {
        const checkOrganizerStatus = async () => {
            try {
                const response = await axios.get(`/v1/isOrganizer/${sessionEmail}`);
                setIsOrganizer(response.data);
            } catch (error) {
                console.error('Error fetching organizer:', error);
            }
        };
        checkOrganizerStatus();

        // Check local storage for user mode selection
        const userMode = localStorage.getItem("userMode");
        if (userMode !== null) {
            setIsUserMode(userMode === "user");
        }
    }, []);

    const handleToggleMenu = () => {
        subMenuRef.current.classList.toggle("open-menu");
    };

    const handleLogout = () => {
        // Clear all session storage
        sessionStorage.clear();
        // Perform any other logout actions (e.g., redirecting to login page)
    };

    const handleProfile = () => {
        // Perform any actions related to viewing/editing the profile
        sessionStorage.setItem("userLoggedIn", "true");
    };

    const handleToggleView = () => {
        const newUserMode = !isUserMode;
        setIsUserMode(newUserMode);
        // Update local storage with the new user mode selection
        localStorage.setItem("userMode", newUserMode ? "user" : "organizer");
    };

    const handleUserOptionClick = () => {
        // Ensure the navbar stays in user mode when a user option is clicked
        setIsUserMode(true);
    };

    return (
        <>
            <nav className="LoggedInNavbar">
                <a href="/home"><img src={logo} width={200} height={100} alt="logo" /></a>
                <SearchComponent />
                <ul className="Options">
                    <li><a className="item" href="/eepick"><span>Explorer's Picks</span></a> </li>
                    {isOrganizer && (
                        <>
                            {isUserMode ? (
                                <>
                                    <li><a className="item" href="/event-creation-form"><span>EventCreation Form</span></a></li>
                                    <li><a className="item" href="/polling-statistics"><span>Poll Statistics</span></a></li>
                                    <li><a className="item" href="/event-statistics"><span>Event Statistics</span></a></li>
                                </>
                            ) : (
                                <>
                                    <li><a href="/Music" className="item">Music</a></li>
                                    <li><a href="/Arts" className="item">Arts</a></li>
                                    <li><a href="/Sports" className="item">Sports</a></li>
                                </>
                            )}
                        </>
                    )}
                    {!isOrganizer && (
                        <>
                            <li><a href="/Music" className="item">Music</a></li>
                            <li><a href="/Arts" className="item">Arts</a></li>
                            <li><a href="/Sports" className="item">Sports</a></li>
                        </>
                    )}
                </ul>
                <FaUser className="user-pic" size={32} onClick={handleToggleMenu} />
                <div className="sub-menu-wrap" id="open-menu" ref={subMenuRef}>
                    <div className="sub-menu">
                        <div className="user-info">
                            <img src={profile} alt="Profile"/>
                            <h3>{name}</h3>
                        </div>
                        <hr/>
                        <a href="/update-profile" onClick={handleProfile} className="sub-menu-link">
                            <img src={user} alt="User"/>
                            <span><p>Edit Profile</p></span>
                        </a>
                        {!isOrganizer && (
                            <a href="/becoming-organizer" className="sub-menu-link">
                                <img src={settings}/>
                                <span><p>Become an Organizer</p>
                                </span>
                            </a>
                        )}
                        {isOrganizer && (
                            <a  className="sub-menu-link" onClick={handleToggleView}>
                                <img src={settings} alt="Settings"/>
                                <span><p>{isUserMode ? "Switch to User" : "Switch to Organizer"}</p></span>
                            </a>
                        )}
                        <a href="/contact-us" onClick={handleProfile} className="sub-menu-link">
                            <img src={help} alt="Help"/>
                            <span><p>Help & Support</p></span>
                        </a>
                        <a href="/home" onClick={handleLogout} className="sub-menu-link">
                            <img src={logout} alt="Logout"/>
                            <span><p>Logout</p></span>
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default LoggedInNavBar;