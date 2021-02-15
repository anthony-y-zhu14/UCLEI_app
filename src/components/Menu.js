import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';
import SideNav from './SideNav'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));
export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });  
  };

  return (
    <React.Fragment key={'left'}>
      <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer"  >
        <MenuIcon />
      </IconButton>
      <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
        <SideNav />
      </Drawer>
    </React.Fragment> 
  );
}
