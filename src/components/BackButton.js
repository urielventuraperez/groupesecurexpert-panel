import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
}));

const BackButton = ({history}) => {
  const classes = useStyles();
  return (
      <Fab onClick={history.goBack} color="secondary" aria-label="add" className={classes.fab}>
        <ArrowBackIcon />
      </Fab>
  );
}

export default BackButton;