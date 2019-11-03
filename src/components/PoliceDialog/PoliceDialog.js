import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function PoliceDialog(props) {
  const { onClose, selectedValue, open } = props;

  return (
    <Dialog fullWidth={true} maxWidth={'sm'} onClose={onClose} aria-labelledby="police-dialog-title" open={open}>
      <DialogTitle id="police-dialog-title">Police Record</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="caption" color='primary'>
              Date
            </Typography>
            <Typography gutterBottom>
              {selectedValue.polDate}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color='primary'>
              Location
            </Typography>
            <Typography gutterBottom>
              {selectedValue.polLocation}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color='primary'>
              Time
            </Typography>
            <Typography gutterBottom>
              {selectedValue.polTime}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color='primary'>
              Status
            </Typography>
            <Typography gutterBottom>
              {selectedValue.polStatus}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color='primary'>
              Offence
            </Typography>
            <Typography gutterBottom>
              {selectedValue.polOffence}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PoliceDialog;
