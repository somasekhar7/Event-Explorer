import React, {useEffect} from 'react';
import './App.css';
import './styles/NavBar.css';
import { Route, Routes, useLocation, Navigate} from "react-router";
import {NavBar} from "./components/NavBar";
import { Music} from "./pages/Music";
import {Sports} from "./pages/Sports";
import {Arts} from "./pages/Arts";
import {useState} from 'react';
import SignIn from "./pages/SignIn";
import OtpVerification from "./components/OtpVerification";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import LoggedInNavBar from "./components/LoggedInNavBar";
import SidebarNavigation from "./components/SidebarNavigation";
import Profile from "./pages/Profile";
import {Break} from "./components/Break";
import UserEvents from "./components/UserEvents";
import ContactInfoForm from "./components/ContactInfoForm";
import PayementMethodForm from "./components/PayementMethodForm";
import HomeC from "./components/HomeC";
import PollItem from "./components/PollItem";
import EventSeatMap from "./components/EventSeatMap";
import EventDetails from "./components/EventDetails";
import ExplorerPick from "./components/ExplorerPick";
import OrganizerPollingStats from "./components/OrganizerPollingStats";
import OrganizerEventStats from "./components/OrganizerEventStats";
import OrganizerEventCreation from "./components/OrganizerEventCreation";
import BecomingAnOrganizer from "./components/BecomingAnOrganizer";
import ExplorerSeatMap from "./components/ExplorerSeatMap";
import MapContainer from "./components/MapContainer";
import { Link } from 'react-router-dom';
import WeatherCard from "./components/WeatherCard";



function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [sideBarOff, setSideBarOff] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location=useLocation();


    const handleSignIn = () => {
        // Perform sign-in logic
        setIsAuthenticated(true);
        const isUserLoggedIn =  sessionStorage.getItem("userLoggedIn");
        console.log("session value ", isUserLoggedIn)

        if(isUserLoggedIn === 'true'){

            setIsLoggedIn(true);

        }else{
            setIsLoggedIn(false);
        }

        console.log("from app.js ", isLoggedIn)
    };
    const handleLogout = () => {
        // Perform logout logic
        sessionStorage.setItem("userLoggedIn", "false");
        setIsLoggedIn(false);
    };
    const isSideBarOff = sessionStorage.getItem("sidebaroff");

    useEffect(() => {

        if(isSideBarOff === 'true'){
            console.log('sidebar wants to off');
            setSideBarOff(false);
        }else{
            setSideBarOff(true);
        }
    }, [isSideBarOff]);

    useEffect(() => {
        // Set isLoggedIn to true in session storage when the user logs in
        const checkLoggedIn =  sessionStorage.getItem("userLoggedIn");
        if (checkLoggedIn) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [isLoggedIn]);



    useEffect(() => {
        // Determine the current page based on the URL
        const path = location.pathname.toLowerCase();
        // List of navigation pages where sidebar should be visible
        const visiblePages = ['/music', '/sports', '/arts'];

        // Check if the current page is in the list of visible pages
        const isPageVisible = visiblePages.includes(path);

        // Update the sidebar state accordingly
        setSideBarOff(!isPageVisible);
    }, [location]);


    return (

        <div className="App">
            <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout}/>


            {isLoggedIn && <Break />}


            {isLoggedIn && sideBarOff && <SidebarNavigation/>}
            <Routes>
                <Route path="/" element={<HomeC/>}/>
                <Route path="/home" element={<HomeC/>}/>
                <Route path="/eepick" element={<ExplorerPick/>}/>
                <Route path="/Sports" element={<Sports/>}/>
                <Route path="/Arts" element={<Arts/>}/>
                <Route path="/music" element={<Music />} />
                <Route path="/SignIn" element={<SignIn onSignIn={handleSignIn}/>}/>
                <Route path="/OtpVerification" element={<OtpVerification/>}/>
                <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
                <Route path="/ResetPassword" element={<ResetPassword/>}/>
                <Route path="/loggedIn" element={<LoggedInNavBar/>}/>

                {isLoggedIn ? (
                    <>
                        <Route path="/poll-item" element={<PollItem/>}/>
                        <Route path="/event-creation-form" element={<OrganizerEventCreation/>}/>
                        <Route path="/polling-statistics" element={<OrganizerPollingStats/>}/>
                        <Route path="/event-statistics" element={<OrganizerEventStats/>}/>
                        <Route path="/sidebar" element={<SidebarNavigation/>}/>
                        <Route path="/update-profile" element={<Profile/>}/>
                        <Route path="/user-events" element={<UserEvents />}/>
                        <Route path="/contact-us" element={<ContactInfoForm />}/>
                        <Route path="/billing" element={<PayementMethodForm />}/>
                        <Route path="/booking" element={<EventSeatMap />} />
                        <Route path="/explorer-booking" element={<ExplorerSeatMap/>}/>
                    </>
                ) : (

                    <Route path="/SignIn" element={<SignIn onSignIn={handleSignIn}/>}/>


                )}

                <Route path="/event/:eventId" element={<EventDetails />} />
                <Route path="/becoming-organizer" element={<BecomingAnOrganizer/>}/>
            </Routes>

        </div>

    );
}

export default App;