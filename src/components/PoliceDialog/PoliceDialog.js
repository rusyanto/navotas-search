import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

function PoliceDialog(props) {
  return (
    <Dialog onClose={props.onClose} aria-labelledby="police-dialog-title" open={props.open}>
      <DialogTitle id="police-dialog-title">Police Record</DialogTitle>
      <DialogContent>
        props.selectedValue
      </DialogContent>
    </Dialog>
  );
}

PoliceDialog.propTypes = {
  open: PropTypes.bool.isRequired
};

export default PoliceDialog;
