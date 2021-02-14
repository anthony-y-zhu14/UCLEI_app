import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import { Button, Container, Fade, Paper } from '@material-ui/core';
import LoginWindow from "../components/LoginWindow"

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
      textAlign: 'left'
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
      textAlign: 'center',
      borderRadius: '30px',
    }
  }));


export default function Intro(props) { 
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = React.useState(props.auth);
  const [Login, setLogin] = React.useState(false);
  const [Register, setRegister] = React.useState(false);

  const handleLogin = () =>{        
    !loggedIn? setLogin(true) : window.location.href="/dashboard"    
  }

  return(
      <React.Fragment>
          <AppBar position="static">
              <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                          Welcome to UCLEI
                  </Typography>

              </Toolbar>
          </AppBar>
          <Paper maxWidth="sm" className={classes.content}>  
          {!Login && (
            <Fade in={true}>
                <Container>
                <h1 className={classes.font}>UCLEI</h1>          
                <Typography variant="h6" className={classes.title}>        
                  UCLEI is a stock trading simulation website that provides a safe, easy-to-use sandbox environment for users to experience how stock market trading works.                        
                </Typography>
                <br />
                <Typography variant="h6" className={classes.title}>  
                  Simply create an account and you are free to explore the excitement of stock trading without consequence!
                </Typography>
                <br />          
                <br />
                <br />
                <Button variant="contained" color='primary' onClick={handleLogin}>                        
                  <NavigationIcon /> Get Started 
                </Button>              
                </Container>
            </Fade>
          )}
          {Login && (                   
              <LoginWindow />                  
          )}
          </Paper>
      </React.Fragment>
      )
    }
