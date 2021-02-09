import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

  const ToastMessages = (props) => {
    return (
      <Snackbar
        anchorOrigin={ 'bottom', 'center' }
        open={props.open}
        onClose={props.onClose}
        message="I love snacks"
      />
  );
}

export default ToastMessages;
