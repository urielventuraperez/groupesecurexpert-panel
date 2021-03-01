import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomSnackbar = (props) => {
  const classes = useStyles();
  console.log(props.status)
  return (
    <div className={classes.root}>
      <Snackbar open={props.open} autoHideDuration={6000} onClose={props.close}>
        <Alert onClose={props.close} severity={props.status ? 'success' : 'error'}>
          {props.status ? '¡Welcome!' : 'Oops!, retry again. Wrong Credentials.' } 
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomSnackbar;
