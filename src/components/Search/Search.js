import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/styles/makeStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import domo from 'ryuu.js';

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
  const [results, setResults] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);

  const inputLabel = React.useRef(null);

  const handleChange = name => event => {
    setDisableBtn(true);
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    if (values.field && values.text.length >= 4) {
      setDisableBtn(false);
    }
  }, [values.field, values.text.length]);

  return (
    <Grid container>
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
            <MenuItem value={'name'}>Name</MenuItem>
            <MenuItem value={'taxId'}>Tax Identification ID</MenuItem>
          </Select>
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
          margin="dense"
          variant="outlined"
          type="text"
        />
      </Grid>
      <Grid item xs={2} className={classes.container}>
        <Button variant="contained" color="secondary" disabled={disableBtn} className={classes.formControl} startIcon={<SearchIcon />}>
          Search
        </Button>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 15 }}>
        {results.length > 0 ? (
          <div>Got results</div>
        ) : (
          <div className={classes.noResult}>
            No Result<br />
            <FindInPageOutlinedIcon style={{ fontSize: 75, margin: 12 }} />
          </div>
        )}
      </Grid>
    </Grid>
  );
}

export default Search;
