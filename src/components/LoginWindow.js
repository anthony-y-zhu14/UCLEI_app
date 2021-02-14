import React from 'react';
import Button from '@material-ui/core/Button';
import { Container, Fade, Paper, TextField, Typography, Zoom } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    LoginWindow: {
      margin: '0% auto',
      textAlign: 'center',
    }
    }));

export default function LoginWindow () {
    const classes = useStyles();
    const [username, setUsername] = React.useState(undefined);

    return (        
      <Fade in={true}>   
      <Grid className={classes.LoginWindow} container spacing={2}>
        <Grid item xs={12}><Typography>I have an account</Typography></Grid>
        <Grid item xs={12}>
          <TextField variant='outlined' label='username'></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField variant='outlined' label='password'></TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='primary'>Sign In</Button>
        </Grid>
      </Grid>
      </Fade>
    )
}