import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import FormDetail from './formDetail';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2), 
    color: 'white',
    flex: 1
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialogFormDetail = ({ detailId, open, close, detail, insurance, company }) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={close}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Breadcrumbs className={classes.title} aria-label="breadcrumb">
              <Typography>
                {`${company}`}
              </Typography>
              <Typography>
                {`${insurance}`}
              </Typography>
              <Typography>{`${detail}`}</Typography>
            </Breadcrumbs>
            <Button autoFocus color="inherit" onClick={close}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <FormDetail detailId={detailId} />
      </Dialog>
    </div>
  );
};

export default FullScreenDialogFormDetail;
