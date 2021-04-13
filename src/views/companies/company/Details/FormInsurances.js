import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { API, LSTOKEN } from 'src/utils/environmets';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1)
  }
}));

const RadioInsurances = ({ idCompany }) => {
  const classes = useStyles();
  const [insurances, setInsurances] = useState([]);
  const [loadInsurances, setLoadInsurances] = useState(false);
  const [value, setValue] = React.useState('');

  useEffect(() => {
    getInsurances(idCompany);
  }, []);

  async function getInsurances(idCompany) {
    let response = await fetch(`${API}/api/company/${idCompany}/insurances`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      }
    });
    if (response.status) {
      let getInsurances = await response.json();
      setLoadInsurances(true);
      setInsurances(getInsurances.data);
    }
  }

  const handleChange = event => {
    console.log(event.target);
    setValue(event.target.value);
  };

  return (
    <Grid container spacing={3}>
      <Grid className={classes.paper} item lg={8} md={12} sm={12}>
      <Paper>
          <TextField
            fullWidth
            style={{ padding: 32 }}
            id="outlined-multiline-static"
            label="Title"
            defaultValue="Default Value"
            variant="outlined"
          />
        </Paper>
        <Paper>
          <TextField
            fullWidth
            style={{ padding: 32 }}
            id="outlined-multiline-static"
            label="Details"
            multiline
            rows={20}
            defaultValue="Default Value"
            variant="outlined"
          />
        </Paper>
      </Grid>
      <Grid item lg={4} md={12} sm={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Insurances</FormLabel>
          {loadInsurances && (
            <RadioGroup
              aria-label="insurances"
              name="insurances"
              value={value}
              onChange={handleChange}
            >
              {insurances.map(insurance => (
                <FormControlLabel
                  key={insurance.id}
                  disabled={!insurance.available}
                  value={insurance.id.toString()}
                  control={<Radio color="primary" />}
                  label={insurance.name}
                />
              ))}
            </RadioGroup>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default RadioInsurances;
