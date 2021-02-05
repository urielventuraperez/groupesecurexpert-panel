import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';

const CompanyDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>Add a new company</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Company name"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Company Description"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="quote"
          label="Company quote"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="order_url"
          label="Company website"
          type="text"
          fullWidth
        />
        <Button color="primary" variant="outlined" component="label">
          Upload Logo
          <input type="file" name="logo" accept="image/x-png,image/gif,image/jpeg" hidden />
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={props.close} color="primary" startIcon={<SaveIcon />}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyDialog;
