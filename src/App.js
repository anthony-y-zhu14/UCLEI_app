import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import  { BreakpointProvider } from 'react-socks';
import Intro from './pages/Intro.js';
import Dashboard from './pages/Dashboard.js'


export default function App(){

    return (
        <React.Fragment>
            <BreakpointProvider>
                <Router>
                        <Switch>
                            <Route exact path="/" component={()=> <Intro />}/>
                            <Route path="/Dashboard" component={()=> <Dashboard />}/>                         
                        </Switch>
                </Router>
            </BreakpointProvider>
        </React.Fragment>
    )
};
