import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import  { BreakpointProvider } from 'react-socks';
import "./components/Header.js"
import Market from "./components/pages/Market.js"
import Account from "./components/pages/Account.js"
import Trading from './components/pages/Trading';
import Login from './components/pages/Login.js';
import Dashboard from './components/pages/Dashboard.js';
import StoreFront from './components/pages/StoreFront.js';
import Register from './components/pages/Register.js';
const serverUrl = "https://uclei.herokuapp.com";

function App(){
    const [auth, setAuth] = useState(undefined);

    function handleChange(newAuth){
            setAuth(newAuth);
        }

    useEffect(()=>{

        if (auth === undefined){
            fetch(serverUrl + '/session')
            .then((res) => res.json())
            .then((data) => setAuth(data))
            .catch((error) => console.log(error.message));
        }

    },[auth]);



    return (
      <React.Fragment>
      <BreakpointProvider>

              <Router>
                      <Switch>

                          <Route
                          path="/login"
                          component={() => <Login session_id={auth} server={serverUrl} onChange={handleChange} />}
                          />
                          <Route exact path="/" component={StoreFront}/>
                          <Route path="/register"  component={() => <Register session_id={auth} onChange={handleChange} server={serverUrl}/>}/>
                          <Route path="/dashboard"  component={() => <Dashboard session_id={auth} server={serverUrl}/>}/>
                          <Route path="/account"  component={() => <Account session_id={auth}/>} server={serverUrl}/>
                          <Route path="/market"  component={() => <Market session_id={auth}/>} server={serverUrl}/>
                          <Route path="/trading"  component={() => <Trading session_id={auth}/>} server={serverUrl}/>
                      </Switch>
              </Router>
                  </BreakpointProvider>
      </React.Fragment>

    )
}


export default App;
