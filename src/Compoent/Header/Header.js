import React, { useContext, useState } from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { userContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";

const Header = () => {
        
   const [ showLogOutButton, setShowLogOutButton] = useState(false)

    //Hamdel Log Out
    const handelLogOut = () => {
        firebase.auth().signOut().then(() => {
            const singedInUser = { name: "", email: "" }
            setLogedInUser(singedInUser)
            setShowLogOutButton(false)
        }).catch((error) => {
            console.log(error);
        });
    }

    const [logedInUser, setLogedInUser] = useContext(userContext)
    return (
        <header>
            <Navbar bg="warning" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Townish Riders</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link className="font-weight-bold text-dark" as={Link} to="/">Home</Nav.Link>
                            <Nav.Link className="font-weight-bold text-dark" as={Link} to="/destination">Destination</Nav.Link>
                            <Nav.Link className="font-weight-bold text-dark" as={Link} to="/blog">Blog</Nav.Link>
                            <Nav.Link className="font-weight-bold text-dark" as={Link} to="/contact">Contact</Nav.Link>
                        </Nav>
                        {logedInUser.email || logedInUser.displayName ? <div className="userInfoArea">
                            <h5 className="text-danger coursor-pointer" onClick = { () => setShowLogOutButton(!showLogOutButton)}>{logedInUser.displayName || logedInUser.email }</h5>
                           {showLogOutButton && <div className="showLogOut">
                            <h5>Email : {logedInUser.email }</h5>
                            <Button as={Link} to="/" variant="primary" onClick={handelLogOut} className="m-2">Log Out</Button>
                            <Button onClick={() => setShowLogOutButton(false) } variant="primary" className="m-2">Close</Button>
                            </div> }
                        </div>  : <Button as={Link} to="/login" variant="primary">Log In</Button>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;