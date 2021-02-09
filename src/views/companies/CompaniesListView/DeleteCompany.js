import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteCompany = (props) => {
  return (
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Action"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              { `Are you sure to delete the ${props.name} company` }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onClose} autoFocus>
            Disagree
          </Button>
          <Button color="secondary" onClick={props.onClose}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default DeleteCompany;