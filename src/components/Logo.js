import React from 'react';
import {
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  logo: {
    width: props=>props.width,
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

Logo.DefaultProps = {
  width: 40,
}

export default Logo;
