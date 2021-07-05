import { React, useState, useEffect } from 'react'
import Home from './Pages/Home';

import PetSitters from './Pages/PetSitters/index';
import PetSitterProfile from './Pages/PetSitters/show';
import PetSitterProfileEdit from './Pages/PetSitters/edit';
import PetSitterProfileNew from './Pages/PetSitters/new';

import ServiceRequests from './Pages/ServiceRequests/index';
import ServiceRequestsNew from './Pages/ServiceRequests/new';
import ServiceRequestsEdit from './Pages/ServiceRequests/edit';

import AboutUs from './Pages/aboutUs';
import Register from './Pages/Users/register';
import Login from './Pages/Users/login';

import NotFound from 'Pages/notFound';

import FormExample from './test';
import NavBar from './Pages/Partials/NavBar';
import Footer from './Pages/Partials/footer';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('https://localhost:44396/api/user', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: 'include',
                });

                const user = await response.json();
                setUserName(user.name);
                debugger
                <NavBar userName={userName} setUserName={setUserName} />
            }
        )();
    });

    // useEffect(async () => {
    //     debugger
    //     const response = await fetch('https://localhost:44396/api/user', {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         credentials: 'include',
    //     });
    //     debugger
    //     const user = await response.json();
    //     debugger
    //     setUserName(user.name);
    //     //<NavBar userName={userName} setUserName={setUserName} />
    // }, [userName])

    return (
        <Router>
            <div className="container d-flex flex-column min-vh-100">

                <NavBar userName={userName} setUserName={setUserName} />
                <Switch>
                    <Route path='/' component={() => <Home userName={userName} />} exact />
                    <Route path='/aboutUs' component={AboutUs} exact />

                    <Route path='/petSitters' component={PetSitters} exact />
                    <Route path='/petSitters/new' component={PetSitterProfileNew} exact />
                    <Route path='/petSitters/:id' component={PetSitterProfile} exact />
                    <Route path='/petSitters/:id/edit' component={PetSitterProfileEdit} exact />

                    <Route path='/serviceRequests' component={ServiceRequests} exact />
                    <Route path='/serviceRequests/new' component={ServiceRequestsNew} exact />
                    <Route path='/serviceRequests/:id/edit' component={ServiceRequestsEdit} exact />
                    <Route path='/tests' component={FormExample} exact />

                    <Route path='/register' component={Register} exact />
                    <Route path='/login' component={() => <Login setUserName={setUserName} />} exact />

                    <Route path='*' component={NotFound} />
                </Switch>
                <div className="mt-auto">
                    <Footer />
                </div>


            </div>
        </Router>

    )
};

export default App;
