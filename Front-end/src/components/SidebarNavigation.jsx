import React, { useState } from "react";

//All the svg files
import logo from "../assests/logo.svg";
import Home from "../assests/home-solid.svg";
import Team from "../assests/social.svg";
import Calender from "../assests/sceduled.svg"
import Projects from "../assests/starred.svg";
import Documents from "../assests/draft.svg";
import { BiCreditCard } from 'react-icons/bi';

import PowerOff from "../assests/power-off-solid.svg";
import styled from "styled-components";
import { NavLink} from "react-router-dom";
import {FaUser} from "react-icons/fa";


const Container= styled.div`
  position: fixed;
    z-index: 1;

  .active {
    border-right: 4px solid white;

    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
`;

const Button = styled.button`
  background-color: black;
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &::before,
  &::after {
    content: "";
    background-color: white;
    height: 1.5px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }

  &::before {
    top: ${(props) => (props.clicked ? "1.5rem" : "1rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }

  &::after {
    top: ${(props) => (props.clicked ? "1.5rem" : "1.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;

const SidebarContainer = styled.div`
  background-color: black;
  width: 4rem;
  height: 80vh;
  margin-top: 1rem;
  border-radius: 0 30px 30px 0;
  padding: 1rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: sticky;
`;

const Logo = styled.div`
  width: 2rem;

  img {
    width: 100%;
    height: auto;
  }
`;

const SlickBar = styled.ul`
  color: white;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;

  padding: 2rem 0;

  position: absolute;
  top: 6rem;
  left: 0;

  width: ${(props) => (props.clicked ? "14rem" : "3.5rem")};
  transition: all 0.5s ease;
  border-radius: 0 30px 30px 0;
`;

const Item = styled(NavLink)`
  text-decoration: none;
  color: white;
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;

  display: flex;
  padding-left: 1rem;

  &:hover {
    border-right: 4px solid white;

    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }

  img {
    width: 1.2rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`;

const Text = styled.span`
  width: ${(props) => (props.clicked ? "100%" : "0")};
  overflow: hidden;
  margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
  transition: all 0.3s ease;
`;

const Profile = styled.div`
  width: ${(props) => (props.clicked ? "14rem" : "2rem")};
  height: 3rem;

  padding: 0.5rem 1rem;
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => (props.clicked ? "9rem" : "0")};

  background-color: black;
  color: white;

  transition: all 0.3s ease;

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      border: 2px solid grey;
      padding: 2px;
    }
  }
`;

const Details = styled.div`
  display: ${(props) => (props.clicked ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  padding: 0 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    display: inline-block;
  }

  a {
    font-size: 0.8rem;
    text-decoration: none;
    color: grey;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Logout = styled.button`
  border: none;
  width: 2rem;
  height: 2rem;
  background-color: transparent;

  img {
    width: 100%;
    height: auto;
    filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg)
      brightness(100%) contrast(126%);
    transition: all 0.3s ease;
    &:hover {
      border: none;
      padding: 0;
      opacity: 0.5;
    }
  }
`;
const iconUrl = `data:image/svg+xml;base64,${window.btoa(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20..."/>'
)}`;
const SidebarNavigation = () => {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => setClicked(!clicked);

    const [profileClick, setProfileClick] = useState(false);
    const handleProfileClick = () => setProfileClick(!profileClick);

    return (

        <Container>
            <Button clicked={clicked} onClick={() => handleClick()}>
                Click
            </Button>
            <SidebarContainer>
                <Logo>
                    <img src={logo} alt="logo" />
                </Logo>
                <SlickBar clicked={clicked}>
                    <Item
                        onClick={() => setClicked(false)}
                        exact
                        activeClassName="active"
                        to="/home"
                    >
                        <img src={Home} alt="Home" />
                        <Text clicked={clicked}>Home</Text>
                    </Item>
                    <Item
                        onClick={() => setClicked(false)}
                        activeClassName="active"
                        to="/update-profile"
                    >
                        <img src={Team} alt="Profile" />
                        <Text clicked={clicked}>Profile</Text>
                    </Item>
                    <Item
                        onClick={() => setClicked(false)}
                        activeClassName="active"
                        to="/user-events"
                    >
                        <img src={Calender} alt="past-events" />
                        <Text clicked={clicked}>Events</Text>
                    </Item>
                    <Item
                        onClick={() => setClicked(false)}
                        activeClassName="active"
                        to="/billing"
                    >

                        <img src={Projects} alt="UpcomingEvents" />
                        <Text clicked={clicked}>Billing Information</Text>
                    </Item>
                </SlickBar>

            </SidebarContainer>
        </Container>

    );
};

export default SidebarNavigation;
