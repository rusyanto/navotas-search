import React, { useState, useEffect } from 'react';
import domo from 'ryuu.js';
import PoliceDialog from '../PoliceDialog';
import makeStyles from '@material-ui/styles/makeStyles';
// Components
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
// Icons
import SearchIcon from '@material-ui/icons/Search';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1)
  },
  noResult: {
    color: theme.palette.text.secondary,
    textAlign: 'center'
  }
}));

function Search() {
  const classes = useStyles();
  const [values, setValues] = useState({
    field: '',
    text: ''
  });
  const [resultInd, setResultInd] = useState(0);
  const [resultData, setResultData] = useState([]);
  const [resultHtml, setResultHtml] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [callingApi, setCallingApi] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const inputLabel = React.useRef(null);

  useEffect(() => {
    if (values.field && values.text.length >= 4) {
      setDisableBtn(false);
    }
  }, [values]);

  const clkSearch = () => {
    setDisableBtn(true);
    setCallingApi(true);
    domo.get('/data/v1/taxPolice?filter=' + values.field + '~' + values.text).then(function(data){
      let resItems = [];
      for (const[index, resItem] of data.entries()) {
        resItems.push(
          <React.Fragment key={index}>
            <Grid item xs={12}>
              <Typography variant="h6">
                {resItem.fullName}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" color='primary'>
                Tax ID
              </Typography>
              <Typography gutterBottom>
                {resItem.taxId}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" color='primary'>
                Sex
              </Typography>
              <Typography gutterBottom>
                {resItem.sex}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" color='primary'>
                Blood Type
              </Typography>
              <Typography gutterBottom>
                {resItem.bloodType}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" color='primary'>
                Birth Date
              </Typography>
              <Typography gutterBottom>
                {resItem.birthdate}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" color='primary'>
                Birthplace
              </Typography>
              <Typography gutterBottom>
                {resItem.birthplace}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" color='primary'>
                Marital Status
              </Typography>
              <Typography gutterBottom>
                {resItem.maritalStatus}
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ margin: '6px 0 28px' }}>
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                disabled={!resItem.polDate}
                startIcon={<FolderSpecialIcon />}
                onClick={handleClickPolice}
                value={index}
              >
                Police Record
              </Button>
            </Grid>
          </React.Fragment>
        );
      }
      setResultHtml(resItems);
      setResultData(data);
      setDisableBtn(false);
      setCallingApi(false);
    });
  }

  const handleChange = name => event => {
    setDisableBtn(true);
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickPolice = event => {
    setResultInd(event.currentTarget.value);
    setOpenDialog(true);
  };

  const handleClosePolice = () => {
    setOpenDialog(false);
  };

  return (
    <Grid container style={{ marginTop: 10 }}>
      <Grid item xs={4} className={classes.container}>
        <FormControl variant="outlined" className={classes.formControl} fullWidth margin="dense">
          <InputLabel ref={inputLabel} htmlFor="search-field">
            Search Field
          </InputLabel>
          <Select
            value={values.field}
            onChange={handleChange('field')}
            labelWidth={200}
            inputProps={{
              name: 'field',
              id: 'search-field'
            }}
          >
            <MenuItem value={'fullName'}>Name</MenuItem>
            <MenuItem value={'taxId'}>Tax Identification ID</MenuItem>
          </Select>
          <FormHelperText>Choose one</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={6} className={classes.container}>
        <TextField
          id="search-text"
          label="Search Text"
          value={values.text}
          onChange={handleChange('text')}
          className={classes.formControl}
          fullWidth
          helperText="Min. 4 characters"
          margin="dense"
          variant="outlined"
          type="text"
        />
      </Grid>
      <Grid item xs={2} className={classes.container}>
        <Button
          variant="contained"
          color="secondary"
          disabled={disableBtn}
          className={classes.formControl}
          startIcon={<SearchIcon />}
          onClick={clkSearch}
          style={{ height: 40 }}
        >
          Search
        </Button>
      </Grid>
      <Grid container item xs={12} style={{ margin: '12px 15px' }}>
        {callingApi ? (
          <Grid item xs={12} style={{ textAlign: 'center', margin: 12 }}>
            <CircularProgress />
          </Grid>
        ) : (
          resultHtml.length > 0 ? (
            resultHtml
          ) : (
            <Grid item xs={12} className={classes.noResult}>
              No Result<br />
              <FindInPageOutlinedIcon style={{ fontSize: 75, margin: 12 }} />
            </Grid>
          )
        )}
      </Grid>
      <PoliceDialog selectedValue={resultData[resultInd] || {}} open={openDialog} onClose={handleClosePolice} />
    </Grid>
  );
}

export default Search;
