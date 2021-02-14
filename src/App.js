import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import  { BreakpointProvider } from 'react-socks';
import Intro from './pages/Intro.js';


export default  function App(){
    const [auth, setAuth] = useState(false);

    async function checkSession() {
        const response = await fetch("/session");
        const body = response.json;
        if (response.status !== 200) {
            throw Error(body.message)
          }
          return body;
    }

    return (
        <React.Fragment>
            <BreakpointProvider>
                <Router>
                        <Switch>
                            <Route exact path="/" component={()=> <Intro auth={auth}/>}/>                        
                        </Switch>
                </Router>
            </BreakpointProvider>
        </React.Fragment>
    )
};
