import React from 'react';
import {
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  logo: {
    width: 40,
  }
}));

const Logo = (props) => {
  const classes = useStyles();

  return (
    <img
      className={classes.logo}
      alt="Logo"
      src="/static/logo.png"
      {...props}
    />
  );
};

export default Logo;
