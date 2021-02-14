import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));


export default function Dashboard() { 
  const classes = useStyles();
  return(
      <div className={classes.root}>
        <Header />
      </div>
      )
 }
