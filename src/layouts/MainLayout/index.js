import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import DashboardLayout from '../DashboardLayout/';
import Hidden from '@material-ui/core/Hidden';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  fullContent: {
    flexGrow: 1,
  }
}));

const MainLayout = props => {
  const classes = useStyles();

  const [ isLogged, setIsLogged ] = useState(true);

  useEffect(()=>{
    setIsLogged(true);
  },[isLogged])

  return (
    <div className={classes.root}>
      <CssBaseline />
        <DashboardLayout isLogged={isLogged} />
        { isLogged && 
          <Hidden mdDown>
            <nav className={classes.drawer}></nav>
          </Hidden>
        }
      <main className={ isLogged ? classes.content : classes.fullContent }>
        { isLogged &&
          <div className={classes.toolbar} />
        }
        {props.content}
      </main>
    </div>
  );
};

export default MainLayout;
