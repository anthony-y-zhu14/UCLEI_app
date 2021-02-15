import { Button, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AssessmentIcon from '@material-ui/icons/Assessment';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    list: {
        margin: 0,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
    },
    homeBtn: {
        margin: 0,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
    }
  }));


let links = {
    home: '/',
    act: '/account',
    dsh: '/dashboard',
    trd: '/trading',
    mrk: '/market'
};

export default function SideNav() {
    const classes = useStyles();
    const navToHome = () => {
        window.location = links.home;
    }
    const navToAct = () => {
        window.location = links.act;
    }
    const navToDsh = () => {
        window.location = links.dsh;
    }
    const navToTrd = () => {
        window.location.href = links.trd;
    }
    const navToMrk = () => {
        window.location.href = links.mrk;
    }
    return(
            <List className={classes.list}>
                    <ListItem>
                        <Button className={classes.homeBtn} size='large' variant='contained' onClick={navToHome}>Home</Button>
                    </ListItem>
                    <ListItem button onClick={navToDsh}>
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText>Dashboard</ListItemText>
                    </ListItem>
                    <ListItem button onClick={navToAct}>
                        <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
                        <ListItemText>Account</ListItemText>
                    </ListItem>
                    <ListItem button onClick={navToTrd}>
                        <ListItemIcon><ShowChartIcon /></ListItemIcon>
                        <ListItemText>Trading</ListItemText>
                    </ListItem>
                    <ListItem button onClick={navToMrk}>
                        <ListItemIcon><AssessmentIcon /></ListItemIcon>
                        <ListItemText>Market</ListItemText>
                    </ListItem>
            </List>
        );
}
