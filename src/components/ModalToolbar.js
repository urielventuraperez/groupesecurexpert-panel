import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const ModalToolbar = (props) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
    <Toolbar>
      <IconButton edge="start" color="inherit" onClick={props.close} aria-label="close">
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" className={classes.title}>
        {props.title}
      </Typography>
      <Button autoFocus color="inherit" onClick={props.close}>
        {props.action}
      </Button>
    </Toolbar>
  </AppBar>
  )
}

export default ModalToolbar;