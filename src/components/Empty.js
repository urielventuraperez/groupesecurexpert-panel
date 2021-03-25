import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    margin: `${theme.spacing(6)}px auto`,
    maxWidth: 500,
  },
  icon: {
    background: theme.palette.warning.main,
    color: theme.palette.text.hint,
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: theme.spacing(1)
  },
  center: {
    textAlign: 'center'
  }
}));

export default function Empty(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid className={classes.center} item xs>
                <PriorityHighIcon className={classes.icon} />
                <Typography gutterBottom variant="h3">
                  {`It's time to add your first ${props.title}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}