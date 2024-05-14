import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assests/logo.png';
import { FaUser } from 'react-icons/fa';
import OffCanvasExample from "../pages/OffCanvasExample";
import React from "react";
import SignInNavBar from "../components/SignInNavBar";
import MyAccountDropDown from "./MyAccountDropDown";
import SearchComponent from "./SearchComponent";
import LoggedInNavBar from "./LoggedInNavBar";
import '../styles/NavBar.css'

interface NavBarProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

export const NavBarTest: React.FC<NavBarProps> = ({ isLoggedIn, onLogout }) => {
    console.log('from NavBar', isLoggedIn);

    return (
        <>
            {isLoggedIn && <LoggedInNavBar />}

            {!isLoggedIn &&
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/home"><img src={logo} width={200} height={100} alt="logo"/></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/#">Explorer's Picks</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Music">Music</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Arts">Arts</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Sports">Sports</a>
                            </li>


                        </ul>
                        <SearchComponent/>
                        <SignInNavBar/>
                    </div>
                </nav>

            }
        </>
    )
}
