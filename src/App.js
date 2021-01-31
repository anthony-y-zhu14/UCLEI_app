import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import  { BreakpointProvider } from 'react-socks';
import "./components/Header.js"
import Market from "./pages/Market.js"
import Account from "./pages/Account.js"
import Trading from './pages/Trading';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import Intro from './pages/Intro.js';
import Register from './pages/Register.js';


export default  function App(){
    const [auth, setAuth] = useState(false);

    useEffect(()=>{
        if (!auth){
            checkSession().then((res) => setAuth(res)).catch((error) => console.log(error.message));
        }
    },[auth]);

   

    async function checkSession() {
        const response = await fetch("/session");
        const body = response.json;
        if (response.status !== 200) {
            throw Error(body.message)
          }
          return body;
    }

    const handleChange = (newAuth) => {
        setAuth(newAuth);
    }

    return (
        <React.Fragment>
            <BreakpointProvider>
                <Router>
                        <Switch>
                            <Route exact path="/" component={()=> <Intro auth={auth}/>}/>
                            <Route path="/login" component={() => <Login session_id={auth} onChange={handleChange} />} />                            
                            <Route path="/register"  component={() => <Register session_id={auth} onChange={handleChange} />}/>
                            <Route path="/dashboard"  component={() => <Dashboard session_id={auth}/>}/>
                            <Route path="/account"  component={() => <Account session_id={auth}/>}/>
                            <Route path="/market"  component={() => <Market session_id={auth}/>}/>
                            <Route path="/trading"  component={() => <Trading session_id={auth}/>}/>
                        </Switch>
                </Router>
            </BreakpointProvider>
        </React.Fragment>
    )
};
