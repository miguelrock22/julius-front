import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './routes/PrivateRoutes';

// Layouts
import Header from './components/Layout/Header';

// Pages
import Home from './components/Pages/Home';
import Posts from './components/Pages/Posts';
import Signup from './components/Pages/Signup';


import './App.css';

function App() {
    return ( 
        <div className = "App">
            <Router>
                <Header />
                <Switch>
                    <div>
                        <main>
                            <div />
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/signup">
                                <Signup />
                            </Route>
                            <PrivateRoute path="/posts" component={Posts} />
                        </main>
                    </div>
                </Switch>
            </Router> 
        </div>
    );
}

export default App;