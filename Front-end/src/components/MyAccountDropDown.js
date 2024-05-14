import React, {useRef, useState} from 'react';
import {FaUser} from "react-icons/fa";
import profile from "../icons/profile.png";
import user from "../icons/user.png";
// import settings from "../icons/settings.png";
import help from "../icons/help.png";
import logout from "../icons/logout.png";
import { BiCalendarCheck } from 'react-icons/bi'; // Bootstrap Icons



const MyAccountDropdown = () => {
    const subMenuRef =useRef(null);
    const name = sessionStorage.getItem("name");

    const handleToogleMenu=()=>{
        subMenuRef.current.classList.toggle("open-menu");
    }
    const handleLogout = () => {
        // Clear all session storage
        sessionStorage.clear();
        // Perform any other logout actions (e.g., redirecting to login page)
    };
    return (

      <>
          <nav className="LoggedInNavbar">
          <FaUser className="user-pic" size={32} onClick={handleToogleMenu}/>
          <div className="sub-menu-wrap" id="open-menu" ref={subMenuRef}>
              <div className="sub-menu">
                  <div className="user-info">
                      <img src={profile}/>
                      <h3>{name}</h3>
                  </div>
                  <hr/>
                  <a href="/update-profile" className="sub-menu-link">
                      <img src={user}/>
                      <span><p>Edit Profile</p></span>
                  </a>
                  <a href="#" className="sub-menu-link">
                      <img className="bi bi-person-badge-fill" alt="org"/>
                      <span><p>Settings & Privacy</p>
                            </span>

                  </a>
                  <a href="#" className="sub-menu-link">
                      <img src={help}/>
                      <span><p>Help & Support</p>
                            </span>

                  </a>
                  <a href="/home" onClick={handleLogout} className="sub-menu-link">
                      <img src={logout}/>
                      <span><p>Logout</p>
                            </span>

                  </a>
              </div>
          </div>
          </nav>

      </>


    );

};

export default MyAccountDropdown;
