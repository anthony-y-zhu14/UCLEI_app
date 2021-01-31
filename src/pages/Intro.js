import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import { Button, Container } from '@material-ui/core';
import Particles from 'react-particles-js';
import LoginWindow from "../components/LoginWindow"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    font: {
      color: "#000"
    },
    li: {
      color: "#000",
      textDecoration: 'none',
      '&:hover':{
        color: '#6C9FF8',
        cursor: 'pointer'
      },
    },
    content: {   
      margin: '20px auto',
      width: "60%",
      padding: '40px',
      color: "black",  
      background: "rgba(250, 250, 250, 0.4)",
      backdropFilter: 'blur(2px)', 
      textAlign: 'center',
      borderRadius: '30px',
      border: "1px solid rgb(255, 255, 255, 0.2)"
    }
  }));

const background = (
  <Particles style={{zIndex: '0', position: 'absolute'}}
    params={{
      "particles": {
          "number": {
              "value": 70
          },
          "size": {
              "value": 4
          },
          "line_linked": {
            "color": {
              'value': "#6c9ff8"
            },
          },
          "color": {
            "value": "#6c9ff8",            
          }
      },

  }} />
);

export default function Intro(props) { 
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = React.useState(props.auth);
  const [Login, setLogin] = React.useState(false);
  const [Register, setRegister] = React.useState(false);

  const handleLogin = () =>{        
    !loggedIn? setLogin(true) : window.location.href="/dashboard"    
  }

  return(
      <div className={classes.root}>
          <AppBar position="static">
              <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                          Welcome to UCLEI
                  </Typography>

              </Toolbar>
          </AppBar>
          {background}
          {!Login && (
            <Zoom in={true}>
            <Container maxWidth="sm" className={classes.content}>              
                <h1 className={classes.font}>UCLEI</h1>          
                <Typography variant="h6" className={classes.title}>        
                  UCLEI is a stock trading simulation website that provides a safe, easy-to-use sandbox environment for users to experience how stock market trading works.                        
                </Typography>
                <br />
                <Typography variant="h6" className={classes.title}>  
                  Simply create an account and you are free to explore the excitement of stock trading without consequence!
                </Typography>
                <br />
                <Typography variant="p" className={classes.title}>Made by Anthony Y. Zhu and Joseph Malovic</Typography>
                <br />
                <br />
                <Typography variant="p" className={classes.title}>
                  <Fab variant="extended" href="https://github.com/anthony-y-zhu14/UCLEI---Stock-Trading-Platform-Sandbox" rel="noreferrer" target="_blank">Check out the repo here</Fab>
                </Typography>           
                <br />
                <br />
                <Fab variant="extended" color='primary' onClick={handleLogin}>                        
                        Get <NavigationIcon /> Started
                </Fab>              
            </Container>
            </Zoom>
          )}
          {Login && (                      
            <LoginWindow/>                        
          )}
      </div>
      )
    }
