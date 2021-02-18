import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';

const FaqDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogTitle id="form-dialog-title">Add new FAQ</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="question"
          label="Add the Question"
          type="text"
          fullWidth
        />
        <TextField
          multiline
          rows={10}
          margin="dense"
          id="answer"
          label="Add the answer"
          type="text"
          fullWidth
        />
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

export default FaqDialog;
