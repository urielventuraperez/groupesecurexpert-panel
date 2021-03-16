import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteCompany } from 'src/redux/actions/companies';
import { connect } from 'react-redux';

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
              { `Are you sure to delete ${props.name} company` }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={props.onClose} autoFocus>
            Cancel
          </Button>
          <Button color="primary" onClick={ () => { props.deleteCompany(props.id); props.onClose } }>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCompany: (id) => { dispatch(deleteCompany(id)) }
  }
}

export default connect(null, mapDispatchToProps)(DeleteCompany);