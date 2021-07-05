import { React, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';


const Navigation = ({ userName, setUserName }) => {
    const Logout = async () => {
        setUserName('')
        //document.cookie = "jwt=;  path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        await fetch('https://localhost:44396/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

    }

    // useEffect(() => {
    //     Menu();
    // })
    const Menu = () => {
        if (!userName) {
            return (
                <Nav className="w-100 d-flex justify-content-between">
                    <div className="d-flex justify-content-start">
                        <Nav.Link href="/aboutUs">ABOUT US</Nav.Link>
                        <Nav.Link href="/petSitters">FIND PET SITTERS</Nav.Link>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Sign Up</Nav.Link>
                    </div>
                </Nav>
            )
        } else {
            return (
                <Nav className="w-100 d-flex justify-content-between">
                    <div className="d-flex justify-content-start">
                        <Nav.Link href="/aboutUs">ABOUT US</Nav.Link>
                        <Nav.Link href="/petSitters">FIND PET SITTERS</Nav.Link>
                        <Nav.Link href="/serviceRequests">MY REQUESTS</Nav.Link>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Nav.Link href="/petSitters/new">MY PET SITTING</Nav.Link>
                        <Nav.Link href="/login" onClick={Logout}>Logout</Nav.Link>
                    </div>
                </Nav>
            )
        }
    };


    return (
        <div>
            <Navbar bg="info" expand="lg" fixed="top" sticky="top" >
                <Navbar.Brand className="ms-3" href="/">PeTi</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {Menu()}
                </Navbar.Collapse>
            </Navbar>
        </div>
    )

};

export default Navigation