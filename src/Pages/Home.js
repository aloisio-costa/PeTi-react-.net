import React from 'react';
import '../assets/css/home.css';

const Home = ({ userName }) => {

    return (
        <div>
            {userName ? 'Hi ' + userName : 'You are not logged in'}
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <header className="mb-auto">
                    <div>
                        <h3 className="float-md-left mb-0 h1 display-1 fw-bold">Welcome to PeTi's</h3>
                        <nav className="nav nav-masthead justify-content-center float-md-right">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                            <a className="nav-link" href="/aboutUs">About Us</a>
                            <a className="nav-link" href="/serviceRequests">Service Requests</a>
                            <a className="nav-link" href="/petSitters">Find Pet Sitters</a>
                            <a className="nav-link" href="/login">Login</a>
                            <a className="nav-link" href="/register">Sign Up</a>
                            <a className="nav-link" href="/logout">Logout</a>
                        </nav>
                    </div>
                </header>
                <main className="px-3">
                    <h1>PeTi's</h1>
                    <h5> When you need to hire someone – a pet sitter, a groomer, a dog walker, anyone – PeTi's finds them for you for free.</h5>
                </main>

                <footer className="mt-auto text-white-50">
                    <p>&copy; 2020 </p>
                </footer>
            </div>
        </div>
    )
};

export default Home;