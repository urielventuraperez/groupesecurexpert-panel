import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalAction = (props) => {
  return (
      <Dialog
        open={props.openModal}
        onClose={props.onCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              { `¿Are you sure?` }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onCloseModal}>
            No
          </Button>
          <Button onClick={props.mainAction} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default ModalAction;