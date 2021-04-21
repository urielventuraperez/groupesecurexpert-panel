import React from 'react';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { addInsurance } from 'src/redux/actions/companies';
import { connect } from 'react-redux';

const InsurancesForm = ({ idCompany, loadInsurances, insurances, addInsurance }) => {
  const [value, setValue] = React.useState('');
  const [activeBtn, setActiveBtn] = React.useState(false);

  const handleChange = event => {
    setValue(event.target.value);
    setActiveBtn(true);
  };

  return (
    <Box flexDirection="row">
      <Typography>Add Insurance</Typography>
      <FormControl component="div">
        {loadInsurances && (
          <RadioGroup
            row
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
      <Button
        disabled = {!activeBtn}
        color="primary"
        aria-label="add"
        onClick={ () => { addInsurance(idCompany, value) } }
      >
        <AddIcon />
        Add Insurance
      </Button>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addInsurance: (idCompany, idInsurance) => {
      dispatch(addInsurance(idCompany, idInsurance))
    }
  }
}

export default connect(null, mapDispatchToProps)(InsurancesForm);
