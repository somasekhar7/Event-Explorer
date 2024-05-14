import logo from "../assests/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import {FaUser} from "react-icons/fa";
import DropdownMenu from "../components/DropDownMenu";
export default function signInNavBar(){

    return (
        <>
            <li><span className="user"><FaUser/></span>
                <a data-bs-toggle="modal" data-bs-target="#staticBackdrop" href="/SignIn">Sign In/Register</a>
            </li>

        </>
    )
        ;
}