import React from 'react';
import Button from '@material-ui/core/Button';
import { Fade, Paper, TextField, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Login_Lottie from '../images/Lottie_Login'

const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: '30px',
      padding: '1em',
      textAlign: 'center'
    },
    LoginWindow: {
    }
    }));

export default function LoginWindow () {
    const classes = useStyles();
    const [username, setUsername] = React.useState(undefined);
    const [password, setPassword] = React.useState(undefined);

    return (        
      <Fade in={true}>   
      <Paper className={classes.root}>
      <Login_Lottie/>
      <Grid className={classes.LoginWindow} container spacing={2}>
        <Grid item xs={12}><Typography variant='h4'>Welcome Back</Typography></Grid>
        <Grid item xs={12}>
          <TextField variant='outlined' label='username' value={username} onChange={(e)=>setUsername(e.target.value)}></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField variant='outlined' type='password' label='password' value={password} onChange={(e)=>setPassword(e.target.value)}></TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='primary' disabled={!username && !password}>Sign In</Button>
        </Grid>
      </Grid>
      </Paper>
      </Fade>
    )
}